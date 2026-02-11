"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2026
---------------------------------------------------------------------------
 @license https: //github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file __init__.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Renderer decorator entry point
"""

from logger import make_logger

logger = make_logger(__name__)


class SectionEntryRenderer:
    __renderers = {}

    @staticmethod
    def get_renderer(name):
        renderer = SectionEntryRenderer.__renderers.get(name)

        if not renderer:
            logger.error(
                f"Unsupported renderer: {name}",
            )

        return renderer

    @staticmethod
    def register_renderer(name, fn):
        SectionEntryRenderer.__renderers[name] = fn


def register_section_entry_renderer(name):
    def decorator(fn):
        SectionEntryRenderer.register_renderer(name, fn)
        return fn

    return decorator


import pkgutil
import importlib

package = __name__

for _, module_name, _ in pkgutil.iter_modules(__path__):
    importlib.import_module(f"{package}.{module_name}")
