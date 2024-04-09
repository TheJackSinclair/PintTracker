from types import SimpleNamespace


def to_dict(obj):
    if isinstance(obj, SimpleNamespace):
        return {key: to_dict(value) for key, value in vars(obj).items()}
    elif isinstance(obj, list):
        return [to_dict(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: to_dict(value) for key, value in obj.items()}
    else:
        return obj
