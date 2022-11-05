import { useEffect, useState } from "react";

import { useUser } from "./UserProvider";
import { Hoglet } from "./Icons";
import Link from "./Link";

type LoginProps = {
  next: () => void;
};

const Login: React.FC<LoginProps> = ({ next }) => {
  const [location, setLocation] = useState<string>("cloud-us");
  const [host, setHost] = useState<string>("app.posthog.com");
  const [apiKey, setApiKey] = useState<string>("");

  const { updateUser } = useUser();

  useEffect(() => {
    if (location === "cloud-us") {
      setHost("app.posthog.com");
    } else if (location === "cloud-eu") {
      setHost("eu.posthog.com");
    }
  }, [location]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    updateUser({
      url: "https://" + (host.slice(-1) === "/" ? host.slice(0, -1) : host),
      apiKey,
      personProps: undefined,
      groupProps: undefined,
    });

    next();
  };

  return (
    <div className="h-full px-6 flex flex-col justify-center bg-light-gray">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Hoglet className="w-8 h-8" />

          <h1 className="text-2xl font-bold">Meet Inspector Hoglet</h1>
          <h5>
            by <a href="https://posthog.com">PostHog</a>
          </h5>

          <p>
            He shows important customer info from PostHog on certain websites
            where you interact with them.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold">Get started</h3>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Where do you run PostHog?
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="cloud-us"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="cloud-us">PostHog Cloud (US)</option>
              <option value="cloud-eu">PostHog Cloud (EU)</option>
              <option value="self-hosted">Self-hosted</option>
            </select>
          </div>

          {location === "self-hosted" ? (
            <div>
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Your PostHog URL
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">https://</span>
                </div>
                <input
                  type="text"
                  name="company-website"
                  id="company-website"
                  className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:pl-14 sm:text-sm"
                  placeholder="www.example.com"
                  onChange={(event) => setHost(event.target.value)}
                />
              </div>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Personal API Key
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(event) => setApiKey(event.target.value)}
                placeholder=""
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="email-description">
              Get one at{" "}
              {location === "self-hosted" ? (
                <Link
                  to={`https://${host}/me/settings#personal-api-keys`}
                  external
                >
                  https://{host}/me/settings
                </Link>
              ) : (
                <Link to="https://app.posthog.com/me/settings" external>
                  https://app.posthog.com/me/settings
                </Link>
              )}
            </p>
          </div>
        </div>

        {/* TODO: Hit the API to make sure everything is valid before coninuing */}
        <button
          disabled={!(location && host && apiKey)}
          className="bg-primary rounded w-full py-2 text-white disabled:bg-blue-200"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Login;
