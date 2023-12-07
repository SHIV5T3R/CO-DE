from enum import Enum


class MessageCategory(Enum):
    STICKER = "sticker"
    IMAGE = "image"
    FILE = "file"
    TEXT = "text"
    AUDIO = "audio"
    LINK = "link"
