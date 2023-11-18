from dataclasses import dataclass
from enum import Enum


@dataclass(frozen=True)
class REGEX:
    EMAIL = r"^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
    PASSWORD = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$"


class ImportType(Enum):
    LOCAL = "local"
    GITHUB = "github"
