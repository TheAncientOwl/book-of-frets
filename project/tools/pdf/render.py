"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file render.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Convert song config to pdf
"""

from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet

import json
import argparse
import os
import logging

from section_entry_renderer import SectionEntryRenderer

from logger import make_logger

logger = make_logger(__name__)

# ─────────────────────────────────────────────
# Section rendering
# ─────────────────────────────────────────────


def render_section(section, song, styles, chords_map, story):
    heading = f'Rendering section "{song.get("title")}"::{section["name"]}'
    logger.info("")
    logger.info("-" * len(heading))
    logger.info(heading)
    logger.info("-" * len(heading))
    logger.info("")

    story.append(
        Paragraph(
            f"{section["name"]} <super>x{section["times"]}</super>",
            styles["Heading3"],
        )
    )

    for entry in section["entries"]:
        renderer = SectionEntryRenderer.get_renderer(entry["renderer"])

        if not renderer:
            continue

        renderer(entry["data"], song["strumms"], styles, chords_map, story)


# ─────────────────────────────────────────────
# Main PDF generation logic
# ─────────────────────────────────────────────


def draw_dark_background(canvas, doc, background_color):
    canvas.saveState()
    canvas.setFillColor(background_color)
    canvas.rect(0, 0, A4[0], A4[1], fill=1)
    canvas.restoreState()


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


def render_song_pdf(config_path: str, out_path: str, chords_map=None, theme=None):
    with open(config_path) as f:
        song = json.load(f)

    # Defaults
    bg_color = colors.black
    title_color = colors.whitesmoke
    artists_color = colors.whitesmoke
    capo_color = colors.whitesmoke
    chords_heading_color = colors.whitesmoke
    chord_text_color = colors.whitesmoke
    chord_bg_color = colors.black
    chord_border_color = colors.whitesmoke

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    # theme overrides
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
            header.get("title", chords_heading_color.hexval()), colors.whitesmoke
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

    # styles
    styles = getSampleStyleSheet()
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

    # cover section
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

    # sections
    for section_id in song["order"]:
        section = song["sections"][section_id]
        render_section(section, song, styles, chords_map, story)
        story.append(Spacer(1, 8))

    # generate pdf
    def first_page(canvas, doc):
        canvas.setTitle(song["title"])
        draw_dark_background(canvas, doc, bg_color)

    doc.build(
        story,
        onFirstPage=first_page,
        onLaterPages=lambda c, d: draw_dark_background(c, d, bg_color),
    )


# ─────────────────────────────────────────────
# CLI entrypoint
# ─────────────────────────────────────────────

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

    pdf_dir = os.path.join(config_dir, "pdf")
    os.makedirs(pdf_dir, exist_ok=True)

    if args.theme:
        theme_dir = os.path.dirname(args.theme)
        theme_folder_name = os.path.basename(theme_dir)
        output_filename = f"{folder_name}.{theme_folder_name}.pdf"
    else:
        output_filename = f"{folder_name}.pdf"

    output_path = os.path.join(pdf_dir, output_filename)

    render_song_pdf(
        args.config_path,
        output_path,
        chords_map=chords_map,
        theme=theme,
    )
