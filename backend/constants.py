from dataclasses import dataclass


@dataclass(frozen=True)
class REGEX:
    EMAIL = r"^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
    PASSWORD = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$"
