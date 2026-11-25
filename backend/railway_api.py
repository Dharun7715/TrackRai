import os


class ProviderNotConfigured(Exception):
    """Raised when no railway data provider has been configured."""


class RailwayProviderError(Exception):
    """Raised when the provider adapter is not ready or fails safely."""


def get_live_status(train_number: str) -> dict:
    """
    Provider adapter placeholder.

    Implement this function against the selected provider's official API
    documentation. Provider paths, auth headers, query parameters, response
    schemas, refresh limits and permitted use vary. Do not guess them.
    """
    provider = os.getenv("RAILWAY_PROVIDER", "").strip()
    base_url = os.getenv("RAILWAY_API_BASE_URL", "").strip()
    api_key = os.getenv("RAILWAY_API_KEY", "").strip()

    if not all([provider, base_url, api_key]):
        raise ProviderNotConfigured(
            "A railway data provider has not been configured."
        )

    raise RailwayProviderError(
        "Provider credentials are present, but the documented adapter "
        "has not been implemented yet."
    )
