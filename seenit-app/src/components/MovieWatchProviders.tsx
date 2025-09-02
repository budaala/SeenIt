
type movieWatchProviders = {
    buy: Array<{
        provider_name: string;
        logo_path: string;
        url: string;
    }>;
    rent: Array<{
        provider_name: string;
        logo_path: string;
        url: string;
    }>;
    flatrate: Array<{
        provider_name: string;
        logo_path: string;
        url: string;
    }>;
};

const MovieWatchProviders: React.FC<{ movieWatchProviders: movieWatchProviders }> = ({ movieWatchProviders }) => {
    return <div className="movieProvidersSection">
        {movieWatchProviders &&
            ((movieWatchProviders.buy &&
                movieWatchProviders.buy.length > 0) ||
                (movieWatchProviders.rent &&
                    movieWatchProviders.rent.length > 0) ||
                (movieWatchProviders.flatrate &&
                    movieWatchProviders.flatrate.length > 0)) && (
                <>
                    <div className="options">
                        {movieWatchProviders.buy[0] && (
                            <div className="option buyOption">
                                <h2 className="providerOptionHeader">Buy</h2>
                                <div className="providersList">
                                    {movieWatchProviders.buy.map((provider) => (
                                        <div
                                            className="provider"
                                            key={provider.provider_name}
                                        >
                                            <a
                                                className="providerLink"
                                                href={provider.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    className="providerLogo logoLink"
                                                    src={provider.logo_path}
                                                    alt={provider.provider_name} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {movieWatchProviders.rent[0] && (
                            <div className="option rentOption">
                                <h2 className="providerOptionHeader">Rent</h2>
                                <div className="providersList">
                                    {movieWatchProviders.rent.map((provider) => (
                                        <div
                                            className="provider"
                                            key={provider.provider_name}
                                        >
                                            <a
                                                className="providerLink"
                                                href={provider.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    className="providerLogo logoLink"
                                                    src={provider.logo_path}
                                                    alt={provider.provider_name} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {movieWatchProviders.flatrate[0] && (
                            <div className="option flatrateOption">
                                <h2 className="providerOptionHeader">
                                    Subscription
                                </h2>
                                <div className="providersList">
                                    {movieWatchProviders.flatrate.map(
                                        (provider) => (
                                            <div
                                                className="provider"
                                                key={provider.provider_name}
                                            >
                                                <a
                                                    className="providerLink"
                                                    href={provider.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        className="providerLogo logoLink"
                                                        src={provider.logo_path}
                                                        alt={provider.provider_name} />
                                                </a>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
    </div>;
}

export default MovieWatchProviders;