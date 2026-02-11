"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https: //github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file chords_v1.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Render chords-v1 section entry
 @deprecated -> V1 is obsolete at this point, use of V2+ is highly encouraged
"""

from . import register_section_entry_renderer

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)
from reportlab.lib.styles import ParagraphStyle

from reportlab.lib import colors
from reportlab.pdfbase.pdfmetrics import stringWidth


from logger import make_logger

logger = make_logger(__name__)


@register_section_entry_renderer("chords-v1")
def render_chords_v1_section_entry(data, strumms, styles, chords_map, story):
    logger.info("rendering")

    not_displayable_times = ["0", "1"]

    def to_chords_paragraph(line: str):
        # line example: "3 C 2 G 2 Am 2 F 2"
        parts = line.split(" ")
        chord_parts = parts[1:]  # skip strumming index

        pairs = [chord_parts[i : i + 2] for i in range(0, len(chord_parts), 2)]
        rendered_parts = []

        for pair in pairs:
            if len(pair) != 2:
                continue

            chord_id, times = pair
            chord_name = (
                chords_map[chord_id]["name"]
                if chord_id in chords_map and "name" in chords_map[chord_id]
                else chord_id
            )

            if times not in not_displayable_times:
                rendered_parts.append(f"{chord_name}<super>{times}</super>")
            else:
                rendered_parts.append(f"{chord_name}")

        paragraph_text = "\u00a0".join(rendered_parts)

        return Paragraph(
            paragraph_text,
            ParagraphStyle(
                name="ChordsV1Line",
                fontSize=10,
                textColor=styles["Normal"].textColor,
                alignment=1,
                leading=14,
                wordWrap="CJK",
            ),
        )

    def to_pattern_paragraph(line: str):
        parts = line.split(" ")
        strumm_index = int(parts[0])

        if strumm_index >= len(strumms):
            return Paragraph("", styles["Normal"])

        pattern = " ".join(strumms[strumm_index])

        return Paragraph(
            pattern,
            ParagraphStyle(
                name="ChordsV1Pattern",
                fontSize=9,
                textColor=styles["Normal"].textColor,
                alignment=1,
                leading=12,
            ),
        )

    for entry in data:
        repeat_times = entry.get("times", 1)
        repeat_text = f"x{repeat_times}"
        repeat_para = Paragraph(
            repeat_text,
            ParagraphStyle(
                name="ChordsV1Repeat",
                fontSize=9,
                textColor=styles["Heading3"].textColor,
                alignment=1,  # right align
                leading=12,
            ),
        )

        items = entry.get("items", [])

        for chunk in items:
            # chunk is a list of line groups
            for line_group in chunk:
                # line_group is a list of chord lines
                table_data = []

                table_data.append([repeat_para])

                for line in line_group:
                    chords_para = to_chords_paragraph(line)
                    pattern_para = to_pattern_paragraph(line)

                    table_data.append([chords_para])
                    table_data.append([pattern_para])

                table = Table(table_data, hAlign="CENTER")
                table.setStyle(
                    TableStyle(
                        [
                            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                            ("TOPPADDING", (0, 0), (-1, -1), 2),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                        ]
                    )
                )

                # Calculate dynamic widths for outer table columns based on content
                from reportlab.pdfbase.pdfmetrics import stringWidth

                # First column: chord lines and patterns
                max_width_table_col = 0
                for row in table_data:
                    cell = row[0]
                    if isinstance(cell, Paragraph):
                        text = cell.getPlainText()
                        cell_width = 0
                        for part in text.split():
                            if "<super>" in part:
                                first, second = part.split("<super>")
                                cell_width += (
                                    stringWidth(first, "Helvetica", 10)
                                    + stringWidth(second, "Helvetica", 6)
                                    + 2
                                )
                            else:
                                cell_width += stringWidth(part, "Helvetica", 10) + 2
                    else:
                        cell_width = stringWidth(str(cell), "Helvetica", 10)

                    if cell_width > max_width_table_col:
                        max_width_table_col = cell_width

                col_widths = [max_width_table_col + 12]

                repeat_width = stringWidth(
                    repeat_para.getPlainText(),
                    repeat_para.style.fontName,
                    repeat_para.style.fontSize,
                )
                col_widths.append(repeat_width + 4)

                story.append(table)
                story.append(Spacer(1, 8))
