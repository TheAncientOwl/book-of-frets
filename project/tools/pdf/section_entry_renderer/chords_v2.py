"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https: //github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file chords_v2.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Render chords-v2 section entry
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


@register_section_entry_renderer("chords-v2")
def render_chords_v2_section_entry(data, strumms, styles, chords_map, story):
    logger.info("rendering")

    colsData = [[]]
    times = []
    betweenSeparator = []

    for item in data:
        if item[0] == "x":
            if " ! 0 " in item:
                splits = item.split(" ! 0 ")

                for idx in range(0, len(splits)):
                    if len(colsData) <= idx:
                        colsData.append([])
                    colsData[idx].append(
                        splits[idx] if idx == 0 else f"x1 {splits[idx]}"
                    )

                betweenSeparator.append("|")
            elif " ? 0 " in item:
                splits = item.split(" ? 0 ")

                for idx in range(0, len(splits)):
                    if len(colsData) <= idx:
                        colsData.append([])
                    colsData[idx].append(
                        splits[idx] if idx == 0 else f"x1 {splits[idx]}"
                    )

                betweenSeparator.append("")
            else:
                if len(colsData) == 0:
                    colsData.append([])

                colsData[0].append(item)
                betweenSeparator.append("")

            times.append(item[: item.index(" ")])
        elif item[0] == ">":
            splits = item.split(" ")

            for idx in range(1, len(splits)):
                col_idx = idx - 1
                if len(colsData) <= col_idx:
                    colsData.append([])

                colsData[col_idx].append(f"> {splits[idx]}")

            times.append(" ")
            betweenSeparator.append("")
        else:
            logger.error(f'Not supported chords-v2 line "{item}"')

    not_displayable_times = ["0", "1"]

    def to_chords(data):
        data = data.split(" ")[1:]
        pairs = [data[i : i + 2] for i in range(0, len(data), 2)]
        parts = []
        for first, second in pairs:
            if second not in not_displayable_times:
                parts.append(f"{first}<super>{second}</super>")
            else:
                parts.append(f"{first}")

        paragraph_text = "\u00a0".join(parts)

        return Paragraph(
            paragraph_text,
            ParagraphStyle(
                name="ChordPair",
                fontSize=10,
                textColor=styles["Normal"].textColor,
                alignment=1,
                leading=14,
                wordWrap="CJK",  # prevent breaking at spaces
            ),
        )

    def to_pattern(data):
        return " ".join(strumms[int(data.split(" ")[1])])

    # --- Convert columns -> rows ---
    total_rows = max(len(col) for col in colsData)
    table_data = []
    for row_idx in range(total_rows):
        row = []

        for col in colsData:
            if row_idx < len(col):
                data = col[row_idx]
                row.append(to_pattern(data) if data[0] == ">" else to_chords(data))
            else:
                row.append("")

            row.append(betweenSeparator[row_idx])

        row.append(times[row_idx] if times[row_idx] != "x1" else "")

        table_data.append(row)

    # Remove the second-to-last element from each row
    for row in table_data:
        if len(row) >= 2:
            del row[-2]

    # Calculate minimal column widths based on content
    col_widths = []
    for col_idx in range(len(table_data[0])):
        max_width = 0
        for row in table_data:
            cell = row[col_idx]
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

            if cell_width > max_width:
                max_width = cell_width

        col_widths.append(max_width + 12)  # add padding

    table = Table(table_data, colWidths=col_widths, hAlign="CENTER")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TEXTCOLOR", (0, 0), (-1, -1), styles["Normal"].textColor),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                # ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),
                # ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ]
        )
    )

    story.append(table)
