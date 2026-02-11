"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https: //github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file gtab_v1.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Render gtab-v1 section entry
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import Table, TableStyle, Spacer
from reportlab.lib import colors

from . import register_section_entry_renderer

from logger import make_logger

logger = make_logger(__name__)

STRING_ORDER = ["e", "B", "G", "D", "A", "E"]


def parse_items(items: str):
    strings_to_frets = {s: ["|"] for s in STRING_ORDER}
    chords = []
    chord_offset = 0

    # safer split: ignores extra spaces
    tokens = items.split()

    for token in tokens:
        if token == "-" or token == "|":
            for arr in strings_to_frets.values():
                arr.append(token)
            chord_offset += 1
            continue

        if token.startswith("[") and token.endswith("]"):
            name = token[1:-1]
            chords.append({"name": name, "offset": chord_offset})
            continue

        # handle combined string+fret parts
        parts = token.split("+")
        pushed = set()
        fill_len = 0

        # find width
        for part in parts:
            if not part:
                continue
            if len(part) > 1:
                fill_len = max(fill_len, len(part[1:]))

        # assign frets
        for part in parts:
            if not part:
                continue

            string_name = part[0]
            fret_str = part[1:]
            arr = strings_to_frets.get(string_name)

            if arr is None:
                continue

            pushed.add(string_name)
            padded = fret_str + ("-" * (fill_len - len(fret_str)))
            arr.append(padded)

        # pad other strings
        for name, arr in strings_to_frets.items():
            if name not in pushed:
                arr.append("-" * fill_len)

        chord_offset += fill_len

    # trailing bar
    for arr in strings_to_frets.values():
        arr.append("|")

    return strings_to_frets, chords


def make_tab_table(strings_to_frets, chords, styles):
    """
    Convert parsed frets & chords into a Platypus Table.
    """
    # Build chord row
    max_len = max(len(v) for v in strings_to_frets.values())
    chord_row = [""] * max_len

    for chord in chords:
        chord_row[chord["offset"]] = chord["name"]

    # Build data rows: chord names first, then strings
    data = [chord_row]
    for string_name in STRING_ORDER:
        row = [string_name] + strings_to_frets[string_name]
        data.append(row)

    # Create a table with monospace spacing
    table = Table(
        data,
        colWidths=[2.5 * mm] * (max_len + 1),
        rowHeights=8 * mm,
    )

    # Simple styling
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "Courier"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("TEXTCOLOR", (0, 0), (-1, -1), styles["Heading3"].textColor),
                ("SPAN", (0, 0), (0, 0)),  # chord row first cell
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )

    return table


@register_section_entry_renderer("gtab-v1")
def render_gtab_v1_section_entry(data, strumms, styles, chords_map, story):
    logger.info("rendering")

    items = data
    strings_to_frets, chords = parse_items(items)
    tab_table = make_tab_table(strings_to_frets, chords, styles)

    # Add spacing before and after
    story.append(Spacer(1, 4))
    story.append(tab_table)
    story.append(Spacer(1, 8))
