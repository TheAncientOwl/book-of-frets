"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file make_pdf.py
 @author Alexandru Delegeanu
 @version 1.8
 @description Convert song config to pdf
"""

import json
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import argparse
import os
from reportlab.pdfbase.pdfmetrics import stringWidth
import logging

# logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def to_color(color_str, fallback):
    try:
        return colors.HexColor(color_str)
    except Exception:
        try:
            return getattr(colors, color_str.lower())
        except AttributeError:
            logger.warning(
                f"Could not convert color '{color_str}', falling back to {fallback}"
            )
            return fallback


def draw_dark_background(canvas, doc, background_color):
    canvas.saveState()
    canvas.setFillColor(background_color)
    canvas.rect(0, 0, A4[0], A4[1], fill=1)
    canvas.restoreState()


def render_song_pdf(config_path: str, out_path: str, chords_map=None, theme=None):
    with open(config_path) as f:
        song = json.load(f)

    # Set default colors if theme or song keys not present
    bg_color = colors.black
    title_color = colors.whitesmoke
    artists_color = colors.whitesmoke
    capo_color = colors.whitesmoke
    chords_heading_color = colors.whitesmoke
    chord_text_color = colors.whitesmoke
    chord_bg_color = colors.black
    chord_border_color = colors.whitesmoke

    if theme:
        # background of PDF
        bg_color = to_color(
            theme.get("song", {}).get("background", "#121212"), colors.black
        )
        # cover section text colors
        header = theme.get("song", {}).get("header", {})
        title_color = to_color(
            header.get("title", title_color.hexval()), colors.whitesmoke
        )
        artists_color = to_color(
            header.get("artists", artists_color.hexval()), colors.whitesmoke
        )
        capo_color = to_color(
            theme.get("song", {}).get("capo", {}).get("text", capo_color.hexval()),
            colors.whitesmoke,
        )
        # chords list heading
        chords_heading_color = to_color(
            header.get("typeTags", chords_heading_color.hexval()), colors.whitesmoke
        )
        # chord table colors
        chord = theme.get("chord", {})
        chord_text_color = to_color(
            chord.get("title", chord_text_color.hexval()), colors.whitesmoke
        )
        chord_bg_color = to_color(
            chord.get("background", chord_bg_color.hexval()), colors.black
        )
        chord_border_color = to_color(
            chord.get("border", chord_border_color.hexval()), colors.whitesmoke
        )

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()
    # Update existing styles in-place for theme
    styles["Title"].alignment = TA_CENTER
    styles["Title"].textColor = title_color
    styles["Italic"].alignment = TA_CENTER
    styles["Italic"].textColor = artists_color
    styles["Heading2"].alignment = TA_CENTER
    styles["Heading2"].textColor = chords_heading_color
    styles["Heading3"].alignment = TA_CENTER
    styles["Heading3"].textColor = title_color
    styles["Normal"].alignment = TA_CENTER
    styles["Normal"].textColor = chord_text_color
    story = []

    # ── Cover Section ─────────────────────
    config_dir = os.path.dirname(config_path)
    cover_path = os.path.join(config_dir, "cover.webp")
    if os.path.isfile(cover_path):
        try:
            cover_img = Image(cover_path)
            cover_img.drawHeight = 64
            cover_img.drawWidth = 64
        except Exception as e:
            logger.warning(f"Failed to load cover image: {e}")
            cover_img = None
    else:
        cover_img = None

    # Create left-aligned styles for cover section text
    cover_title_style = styles["Title"].clone("cover_title")
    cover_title_style.alignment = TA_LEFT
    cover_title_style.textColor = title_color
    cover_artists_style = styles["Italic"].clone("cover_artists")
    cover_artists_style.alignment = TA_LEFT
    cover_artists_style.textColor = artists_color
    cover_capo_style = styles["Normal"].clone("cover_capo")
    cover_capo_style.alignment = TA_LEFT
    cover_capo_style.textColor = capo_color

    title_paragraph = Paragraph(f"<b>{song['title']}</b>", cover_title_style)
    artists_paragraph = Paragraph(", ".join(song["artists"]), cover_artists_style)
    capo_paragraph = Paragraph(f"Capo: {song['capo']}", cover_capo_style)

    if cover_img:
        # Make a minimal-width text column (right), fixed image width (left)
        text_table = Table(
            [
                [title_paragraph],
                [Spacer(1, 1)],
                [artists_paragraph],
                [Spacer(1, 1)],
                [capo_paragraph],
            ],
            # Set colWidths to None for minimal width
            style=TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 2),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                    ("TOPPADDING", (0, 0), (-1, -1), 2),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ]
            ),
        )
        # Calculate minimal width for text_table based on widest paragraph
        max_text_width = (
            max(
                stringWidth(
                    song["title"],
                    cover_title_style.fontName,
                    cover_title_style.fontSize,
                ),
                max(
                    stringWidth(
                        ", ".join(song["artists"]),
                        cover_artists_style.fontName,
                        cover_artists_style.fontSize,
                    ),
                    stringWidth(
                        f"Capo: {song['capo']}",
                        cover_capo_style.fontName,
                        cover_capo_style.fontSize,
                    ),
                ),
            )
            + 10
        )  # small padding

        cover_table = Table(
            [
                [
                    cover_img,
                    Spacer(10, 1),
                    text_table,
                ]
            ],
            colWidths=[64, 10, max_text_width],
            hAlign="CENTER",
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (0, 0), "MIDDLE"),
                    ("VALIGN", (2, 0), (2, 0), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 2),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                    ("TOPPADDING", (0, 0), (-1, -1), 2),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ]
            ),
        )
        story.append(cover_table)
        story.append(Spacer(1, 4))
    else:
        # If no cover image, fallback to original title/artist display
        story.append(title_paragraph)
        story.append(artists_paragraph)
        story.append(capo_paragraph)
        story.append(Spacer(1, 24))

    def get_chord_name(chord_id):
        if chords_map and chord_id in chords_map:
            chord_name = chords_map[chord_id].get("name", chord_id)
            return chord_name
        return chord_id

    # ── Meta info ─────────────────────────
    # Removed original title, artists, capo here since moved to cover section

    # ── Chords list ───────────────────────
    chord_names_list = [get_chord_name(chord_id) for chord_id in song["chordIDs"]]
    story.append(Paragraph("<b>Chords</b>", styles["Heading2"]))
    story.append(Paragraph(", ".join(chord_names_list), styles["Normal"]))
    story.append(Spacer(1, 16))

    def make_group_cell(group, song, styles, chords_map):
        group_chords = []
        strum_index = None

        for raw in group:
            parts = raw.split()
            strum_index = int(parts[0])

            chords_with_numbers = ""
            for j in range(1, len(parts), 2):
                chord = parts[j]
                number = parts[j + 1] if j + 1 < len(parts) else ""
                if chords_map and chord in chords_map:
                    chord_name = chords_map[chord].get("name", chord)
                else:
                    chord_name = chord
                if number == "1":
                    chords_with_numbers += f"{chord_name} &nbsp;"
                else:
                    chords_with_numbers += f"{chord_name}<super><font size=8>{number}</font></super> &nbsp;"

            group_chords.append(chords_with_numbers.strip())

        # Remove HTML tags and &nbsp; for width calculation
        from re import sub

        chords_text_plain = sub(r"<.*?>", "", " ".join(group_chords)).replace(
            "&nbsp;", " "
        )
        strums_text_plain = sub(
            r"<.*?>", "", " ".join(song["strumms"][strum_index])
        ).replace("&nbsp;", " ")

        chords_p = Paragraph(" ".join(group_chords), styles["Normal"])
        strums_p = Paragraph(" ".join(song["strumms"][strum_index]), styles["Normal"])

        return {
            "chords_p": chords_p,
            "strums_p": strums_p,
            "chords_text": chords_text_plain,
            "strums_text": strums_text_plain,
        }

    # ── Sections ──────────────────────────
    for i, section_id in enumerate(song["order"]):
        section = song["sections"][section_id]
        section_type = section.get("type", "str")

        # Section title with times, if > 1
        section_title = section["name"].capitalize()
        if section.get("times", 1) > 1:
            section_title += f"  x{section['times']}"
        story.append(Paragraph(section_title, styles["Heading3"]))

        if section_type == "str":
            # Render strummed sections as before
            for block in section["chords"]:
                for line in block["items"]:
                    row = []
                    width_sources = []

                    for group in line:
                        cell = make_group_cell(group, song, styles, chords_map)
                        row.append([cell["chords_p"], cell["strums_p"]])
                        width_sources.append(cell)

                    col_widths = []
                    for cell in width_sources:
                        chord_w = stringWidth(
                            cell["chords_text"],
                            styles["Normal"].fontName,
                            styles["Normal"].fontSize,
                        )
                        strum_w = stringWidth(
                            cell["strums_text"],
                            styles["Normal"].fontName,
                            styles["Normal"].fontSize,
                        )

                        col_widths.append(max(chord_w, strum_w) + 20)

                    table = Table(
                        [row],
                        colWidths=col_widths,
                        hAlign="CENTER",
                        style=TableStyle(
                            [
                                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                                ("LEFTPADDING", (0, 0), (-1, -1), 2),
                                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                                ("TOPPADDING", (0, 0), (-1, -1), 2),
                                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                                ("TEXTCOLOR", (0, 0), (-1, -1), chord_text_color),
                            ]
                        ),
                    )

                    story.append(table)
        else:
            # For non-strummed types (e.g., "tab"), display "Coming soon..."
            story.append(Paragraph("Coming soon...", styles["Normal"]))

        # Only add spacer if not the last section
        if i < len(song["order"]) - 1:
            story.append(Spacer(1, 1))

    def first_page_with_title(canvas, doc):
        canvas.setTitle(song["title"])
        draw_dark_background(canvas, doc, bg_color)

    doc.build(
        story,
        onFirstPage=first_page_with_title,
        onLaterPages=lambda canvas, doc: draw_dark_background(canvas, doc, bg_color),
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Render a song PDF from a config.json file"
    )
    parser.add_argument("config_path", help="Path to the song config.json file")
    parser.add_argument(
        "--chords",
        help="Optional path to a JSON file mapping chord IDs to chord info",
        default=None,
    )
    parser.add_argument(
        "--theme",
        help="Optional path to a JSON theme file",
        default=None,
    )

    args = parser.parse_args()

    chords_map = None
    if args.chords:
        with open(args.chords) as f:
            chords_map = json.load(f)["index"]

    theme = None
    if args.theme:
        with open(args.theme) as f:
            theme = json.load(f)

    config_dir = os.path.dirname(args.config_path)
    folder_name = os.path.basename(config_dir)

    # Create a 'pdf' subdirectory in the same directory as config.json
    pdf_dir = os.path.join(config_dir, "pdf")
    os.makedirs(pdf_dir, exist_ok=True)

    if args.theme:
        theme_dir = os.path.dirname(args.theme)
        theme_folder_name = os.path.basename(theme_dir)
        output_filename = f"{folder_name}.{theme_folder_name}.pdf"
    else:
        output_filename = f"{folder_name}.pdf"

    output_path = os.path.join(pdf_dir, output_filename)

    render_song_pdf(args.config_path, output_path, chords_map=chords_map, theme=theme)
