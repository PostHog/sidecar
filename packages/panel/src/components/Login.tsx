import { useEffect, useState } from "react";

import { useUser } from "./UserProvider";
import { SidecarLogo } from "./Icons";
import Link from "./Link";

type LoginProps = {
  next: () => void;
};

const Login: React.FC<LoginProps> = ({ next }) => {
  const [location, setLocation] = useState<string>("cloud-us");
  const [host, setHost] = useState<string>("app.posthog.com");
  const [apiKey, setApiKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { updateUser } = useUser();

  useEffect(() => {
    if (location === "cloud-us") {
      setHost("app.posthog.com");
    } else if (location === "cloud-eu") {
      setHost("eu.posthog.com");
    }
  }, [location]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");

    const url =
      "https://" + (host.slice(-1) === "/" ? host.slice(0, -1) : host);

    const res = await fetch(`${url}/api/users/@me`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.status !== 200) {
      const data = await res.json();

      if ("detail" in data) {
        setError(data.detail);
      } else {
        setError(
          "Something went wrong, please check your configuration values again."
        );
      }
    } else {
      updateUser({
        url,
        apiKey,
        personProps: undefined,
        groupProps: undefined,
      });

      next();
    }
  };

  return (
    <div className="h-full px-6 flex flex-col justify-center bg-light-gray">
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-2">
          <SidecarLogo className="h-20 mb-4" />

          <h1 className="text-2xl font-bold hidden">PostHog Sidecar</h1>

          <p className="text-[15px]">
            Customer data from PostHog that shows in any SaaS tool
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-0">Get started</h3>

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
              className="mt-1 block w-full rounded-sm border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
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
                htmlFor="host"
                className="block text-sm font-medium text-gray-700"
              >
                Your PostHog Host
              </label>
              <div className="relative mt-1 rounded-sm shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">https://</span>
                </div>
                <input
                  type="text"
                  name="host"
                  id="host"
                  className="block w-full rounded-sm border-gray-300 pl-16 focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="www.example.com"
                  onChange={(event) => setHost(event.target.value)}
                />
              </div>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-700"
            >
              Your Personal API Key
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="api-key"
                id="api-key"
                className="block w-full rounded-sm border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                  https://{host || "your-posthog-host"}/me/settings
                </Link>
              ) : (
                <Link
                  to="https://app.posthog.com/me/settings#personal-api-key"
                  external
                >
                  https://app.posthog.com/me/settings
                </Link>
              )}
            </p>
          </div>
        </div>

        <div className="relative">
          {error && (
            <span className="block w-full absolute bottom-full mb-2 text-red-600 font-semibold text-sm text-center">
              {error}
            </span>
          )}

          <button
            disabled={!(location && host && apiKey)}
            className="bg-primary rounded w-full py-2 text-white disabled:bg-blue-200 relative hover:scale-[1.005] active:top-[0.25px] active:scale-[1] transition-all font-bold text-[15px]"
          >
            Next
          </button>

          <p className="text-sm font-semibold text-center mt-3">
            <Link
              to="https://posthog.com?utm_source=sidecar-extension"
              external
            >
              New to PostHog?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
