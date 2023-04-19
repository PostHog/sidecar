import { useState, useEffect } from "react";

import { useUser } from "./UserProvider";

import Person, { PersonData } from "./Person";
import Link from "./Link";
import CurrentProject from "./CurrentProject";
import { PostHogLogomark, Settings } from "./Icons";


type PersonsProps = {
  setScreen: (screen: string) => void;
};

const Persons: React.FC<PersonsProps> = (props) => {
  const { user } = useUser();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [persons, setPersons] = useState<PersonData[]>([]);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    if (url.has("email") && user) {
      setQuery(url.get("email") as string);

      setLoading(true);

      fetch(
        `${user.url}/api/projects/@current/persons?search=${url.get("email")}`,
        { headers: { Authorization: `Bearer ${user.apiKey}` } }
      )
        .then((res) => res.json())
        .then((data) => setPersons(data.results))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    setLoading(true);

    const res = await fetch(
      `${user.url}/api/projects/@current/persons?search=${query}`,
      { headers: { Authorization: `Bearer ${user.apiKey}` } }
    );

    const data = await res.json();

    setPersons(data.results);

    setLoading(false);
  };

  return (
    <div
      className={`bg-background dark:bg-background-dark w-full h-full text-primary dark:text-primary-dark flex flex-col border-l border-border dark:border-border-dark shadow-md transform transition-transform`}
    >
      <div className="px-2 pt-2">
        <div className="flex justify-between items-center space-x-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 flex items-center">
              <PostHogLogomark />
            </span>
            <span className="font-semibold opacity-75 text-sm">
              <CurrentProject />
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {user && (
              <Link
                to={`${user.url}/persons?search=${query}`}
                external
                classes="text-xs text-black bg-accent/5 hover:bg-accent/10 active:bg-accent/20 py-1.5 px-3 rounded-full leading-none group"
              >
                Open in PostHog
                <span className="ml-1 opacity-50 group-hover:opacity-75">→</span>
              </Link>
            )}
            <button onClick={() => props.setScreen("configure")} className="group flex items-center justify-center leading-none p-1.5 rounded-sm hover:bg-primary/20 dark:hover:bg-primary-dark/20">
              <span className="inline-block w-4 h-4 text-primary/30 dark:text-primary-dark/30 group-hover:text-primary/60 group-hover:dark:text-primary-dark/60"><Settings /></span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-grow border-border dark:border-border-dark border-solid rounded-sm px-2 py-1 text-sm bg-accent dark:bg-accent-dark"
              placeholder="Search users in PostHog..."
              value={query}
              onInput={(event) =>
                setQuery((event.target as HTMLInputElement).value)
              }
            />
            <button type="submit" className="hidden">
              Submit
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <ul className="divide-y divide-border dark:divide-border-dark">
          {new Array(8).fill(1).map((_, i) => {
            return (
              <li key={i} className="py-3 px-3">
                <div className="w-full rounded py-3 bg-gray-200 dark:bg-[rgba(255,255,255,.1)] animate-pulse" />
              </li>
            );
          })}
        </ul>
      ) : persons.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          No results
        </div>
      ) : (
        <ul className="divide-y overflow-y-scroll divide-border dark:divide-border-dark flex-grow overscroll-y-contain pb-2 scrollbar-thin scrollbar-rounded scrollbar-thumb-[rgba(0,0,0,.4)] hover:scrollbar-thumb-[rgba(0,0,0,.6)] dark:scrollbar-thumb-[rgba(255,255,255,.1)] hover:dark:scrollbar-thumb-[rgba(255,255,255,.2)] scrollbar-thumb-rounded-full scrollbar-track-accent dark:scrollbar-track-accent-dark">
          {persons.map((person) => {
            return (
              <li key={person.id}>
                <Person person={person} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Persons;
