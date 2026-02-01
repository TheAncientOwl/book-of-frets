"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file make_pdf.py
 @author Alexandru Delegeanu
 @version 1.2
 @description Convert song config to pdf
"""

import json
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
import argparse
import os


def draw_dark_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#121212"))
    canvas.rect(0, 0, A4[0], A4[1], fill=1)
    canvas.restoreState()


def render_song_pdf(config_path: str, out_path: str):
    with open(config_path) as f:
        song = json.load(f)

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()
    # Update existing styles in-place for dark theme
    styles["Title"].alignment = TA_CENTER
    styles["Title"].textColor = colors.whitesmoke
    styles["Italic"].alignment = TA_CENTER
    styles["Italic"].textColor = colors.lightgrey
    styles["Heading2"].alignment = TA_CENTER
    styles["Heading2"].textColor = colors.whitesmoke
    styles["Heading3"].alignment = TA_CENTER
    styles["Heading3"].textColor = colors.whitesmoke
    styles["Normal"].alignment = TA_CENTER
    styles["Normal"].textColor = colors.whitesmoke
    story = []

    # ── Title ─────────────────────────────
    story.append(Paragraph(f"<b>{song['title']}</b>", styles["Title"]))
    story.append(Paragraph(", ".join(song["artists"]), styles["Italic"]))
    story.append(Spacer(1, 16))

    # ── Meta info ─────────────────────────
    story.append(Paragraph(f"Capo: {song['capo']}", styles["Normal"]))
    story.append(Spacer(1, 12))

    # ── Chords list ───────────────────────
    story.append(Paragraph("<b>Chords</b>", styles["Heading2"]))
    story.append(Paragraph(", ".join(song["chordIDs"]), styles["Normal"]))
    story.append(Spacer(1, 16))

    # ── Sections ──────────────────────────
    for i, section_id in enumerate(song["order"]):
        section = song["sections"][section_id]

        story.append(Paragraph(section["name"].capitalize(), styles["Heading3"]))

        for block in section["chords"]:
            for line in block["items"]:
                line_chords = []
                line_strums = []
                for group in line:
                    group_chords = []
                    strum_index = None
                    for raw in group:
                        parts = raw.split()
                        strum_index = int(parts[0])
                        chords_with_numbers = ""
                        for j in range(1, len(parts), 2):
                            chord = parts[j]
                            print(chord)
                            number = parts[j + 1] if j + 1 < len(parts) else ""
                            if number == "1":
                                chords_with_numbers += f"{chord} &nbsp;"
                            else:
                                chords_with_numbers += f"{chord}<super><font size=8>{number}</font></super> &nbsp;"
                        group_chords.append(chords_with_numbers.strip())
                    line_chords.append("  ".join(group_chords))
                    if strum_index is not None:
                        line_strums.append(" ".join(song["strumms"][strum_index]))
                story.append(Paragraph("   ".join(line_chords), styles["Normal"]))
                story.append(Paragraph("   ".join(line_strums), styles["Normal"]))

        # Only add spacer if not the last section
        if i < len(song["order"]) - 1:
            story.append(Spacer(1, 12))

    doc.build(
        story, onFirstPage=draw_dark_background, onLaterPages=draw_dark_background
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Render a song PDF from a config.json file"
    )
    parser.add_argument("config_path", help="Path to the song config.json file")

    args = parser.parse_args()

    config_dir = os.path.dirname(args.config_path)
    folder_name = os.path.basename(config_dir)
    output_path = os.path.join(config_dir, f"{folder_name}.pdf")

    render_song_pdf(args.config_path, output_path)
