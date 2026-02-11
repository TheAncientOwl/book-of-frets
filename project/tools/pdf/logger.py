"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https: //github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file logger.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Formatter logger utiliy
"""

import logging
import colorlog


def make_logger(name: str, level: int = logging.INFO) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(level)

    if logger.handlers:
        return logger

    handler = colorlog.StreamHandler()

    formatter = colorlog.ColoredFormatter(
        "%(log_color)s%(levelname)-8s "
        "%(asctime)s | "
        "%(name)s %(reset)s» "
        "%(message)s",
        datefmt="%H:%M:%S",
        log_colors={
            "DEBUG": "green",
            "INFO": "cyan",
            "WARNING": "yellow",
            "ERROR": "red",
            "CRITICAL": "bold_red",
        },
    )

    handler.setFormatter(formatter)
    logger.addHandler(handler)

    logger.propagate = False

    return logger
