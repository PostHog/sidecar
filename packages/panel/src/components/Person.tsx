import { useState, useEffect } from "react";

import { Collapse, Expand, Activity, Profile, Toggle, Play } from "./Icons";

import FeatureFlags, { FeatureFlagsData } from "./FeatureFlags";
import Section from "./Section";
import Header from "./Header";
import List from "./List";
import ListItem from "./ListItem";
import Link from "./Link";
import Event from "./Event";

import { Tab } from "@headlessui/react";

import { useUser } from "./UserProvider";
import { colonDelimitedDuration, humanFriendlyDetailedTime } from "../utils";
import React from "react";

export type PersonData = {
  id: string;
  uuid: string;
  name: string;

  distinct_ids: string[];

  properties: Record<string, any>;

  created_at: string;
};

export type Recording = {
  id: string;
  viewed: boolean;
  recording_duration: string;
  distinct_id: string;
  start_time: string;
  end_time: string;
};

export type Group = {
  id: string;
  type: string;
  name: string;
  group_type_index: number;
  group_key: string;
  created_at: string;
  properties: Record<string, any>;
};

export type Event = {
  distinct_id: string;
  event: string;
  id: string;
  properties: Record<string, any>;
  timestamp: string;
};

const tabs = ["Activity", "Profile", "Feature Flags"];

const Person: React.FC<{ person: PersonData }> = ({ person }) => {
  const { user } = useUser();

  const personPropsToShow = user?.personProps
    ? new Set(user.personProps)
    : undefined;

  const [expanded, setExpanded] = useState(false);

  const [featureFlags, setFeatureFlags] = useState<
    FeatureFlagsData | undefined
  >(undefined);
  const [recordings, setRecordings] = useState<Recording[] | undefined>(
    undefined
  );
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [groups, setGroups] = useState<Group[] | undefined>(undefined);

  useEffect(() => {
    if (expanded && user) {
      if (recordings === undefined) {
        fetch(
          `${user.url}/api/projects/@current/session_recordings?person_uuid=${person.uuid}&limit=6`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setRecordings(data.results))
          .catch((err) => {
            setRecordings([]);
            console.error(err);
          });
      }

      if (!featureFlags) {
        fetch(
          `${user.url}/api/projects/@current/feature_flags/evaluation_reasons?distinct_id=${person.distinct_ids[0]}&limit=15`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setFeatureFlags(data));
      }

      if (events === undefined) {
        fetch(
          `${user.url}/api/projects/@current/events?person_id=${person.id}&orderBy=["-timestamp"]&limit=10`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setEvents(data.results))
          .catch((err) => {
            setEvents([]);
            console.error(err);
          });
      }

      if (groups === undefined) {
        fetch(`${user.url}/api/projects/@current/groups_types`, {
          headers: { Authorization: `Bearer ${user.apiKey}` },
        })
          .then((res) => res.json())
          .then((groupTypes) => {
            fetch(
              `${user.url}/api/projects/@current/groups/related?id=${person.id}`,
              { headers: { Authorization: `Bearer ${user.apiKey}` } }
            )
              .then((res) => res.json())
              .then((data) =>
                setGroups(
                  data.map((group: any) => {
                    return {
                      ...group,
                      name: groupTypes[group.group_type_index].name_plural,
                    };
                  })
                )
              );
          });
      }
    }
  }, [expanded]);

  return user ? (
    <div key={person.id} className="pb-2">
      <div className="flex items-center space-x-2 py-2 px-1 cursor-pointer bg-accent dark:bg-background-dark relative transition-all hover:scale-[1.005] active:top-[0.5px] active:scale-[1]">
        <button
          className="shrink-0 leading-none hover:bg-accent/25 active:bg-primary-dark/25 rounded p-1 text-primary dark:text-primary-dark"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <span className="inline-block w-6 h-6 text-primary dark:text-primary-dark">
            {expanded ? <Collapse /> : <Expand />}
          </span>
          <span className="sr-only">Expand person</span>
        </button>
        <div
          onClick={() => setExpanded((expanded) => !expanded)}
          className="cursor-pointer space-y-0.5"
        >
          <span className="text-[15px]">{person.name}</span>

          <a
            href={`${user.url}/person/${person.distinct_ids[0]}`}
            className="font-semibold text-sm ml-0.5 mt-1 
            text-primary/30 
            dark:text-primary-dark/30 
            hover:text-primary/60 
            dark:hover:text-white/50 
            hover:bg-accent/20 
            dark:hover:bg-white/20 
            px-1 py-0.5 rounded-sm"
            target="_blank"
          >
            <span className="inline-block -rotate-45">→</span>
          </a>

          <p className="text-xs font-code opacity-60">
            {person.distinct_ids[0]}
          </p>

          <div className="text-xs text-primary/40 dark:text-primary-dark/40">
            First seen:{" "}
            <time className="" dateTime={person.created_at}>
              {humanFriendlyDetailedTime(
                person.created_at,
                "MMMM DD, YYYY",
                "h:mm A"
              )}
            </time>
          </div>
        </div>
      </div>

      {expanded && (
        <Tab.Group>
          <Tab.List className="items-center mx-2 mb-2 space-x-[2px]">
            {tabs.map((tab) => (
              <Tab key={tab} as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected
                      ? "text-primary font-bold dark:text-primary-dark bg-primary-dark/20 dark:bg-border-dark"
                      : "text-primary/75 dark:text-primary-dark/75 hover:bg-accent dark:hover:bg-accent-dark"
                      } inline-flex justify-center gap-1.5 px-2.5 py-2 rounded-sm text-xs h-full relative hover:scale-[1.02] active:top-[0.25px] active:scale-[1.01] hover:border-accent transition-all`}
                  >
                    <span className="inline-block h-4 w-4 text-primary dark:text-primary-dark"><Activity /></span>
                    {/*}
                    <span className="inline-block h-4 w-4 text-primary dark:text-primary-dark"><Profile /></span>
                    <span className="inline-block h-4 w-4 text-primary dark:text-primary-dark"><Toggle /></span>
                    */}
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel as="div" className="space-y-2">
              <Section>
                <Header
                  link={`${user.url}/person/${person.distinct_ids[0]}#activeTab=sessionRecordings`}
                >
                  Recordings
                </Header>
                <List loading={recordings === undefined}>
                  {recordings?.map((recording) => {
                    const formattedDuration = colonDelimitedDuration(
                      recording.recording_duration
                    );

                    return (
                      <ListItem key={recording.id} recording>
                        <Link
                          to={`${user.url}/person/${person.distinct_ids[0]}#activeTab=sessionRecordings&sessionRecordingId=${recording.id}`}
                          recording
                          external
                        >
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2 group">
                              <span className="inline-block w-4 h-4 text-primary dark:text-primary-dark opacity-30 group-hover:opacity-75"><Play /></span>
                              <span className="text-xs">
                                {humanFriendlyDetailedTime(
                                  recording.start_time,
                                  "MMMM DD, YYYY",
                                  "h:mm A"
                                )}
                                <span className="hidden leading-none group-hover:inline-block -rotate-45 opacity-50 px-1 py-0.5">
                                  →
                                </span>
                              </span>
                            </div>

                            <span className="block text-primary/40 dark:text-primary-dark/40 text-xs">
                              {formattedDuration}
                            </span>
                          </div>
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Section>

              <Section>
                <Header>Events</Header>
                <List loading={events === undefined}>
                  {events?.map((event) => {
                    return (
                      <ListItem key={event.id} event>
                        <Event>
                          <div className="w-full flex items-center justify-between">
                            <span className="">{event.event}</span>
                            <span>
                              {humanFriendlyDetailedTime(
                                event.timestamp,
                                "MMMM DD, YYYY",
                                "h:mm A"
                              )}
                            </span>
                          </div>
                        </Event>
                      </ListItem>
                    );
                  })}
                </List>
              </Section>
            </Tab.Panel>

            <Tab.Panel as="div">
              <Section>
                <Header>Person Properties</Header>
                <List>
                  {Object.entries(person.properties)
                    .filter(([key]) =>
                      personPropsToShow ? personPropsToShow.has(key) : true
                    )
                    .map(([key, value]) => {
                      if (typeof value !== "object") {
                        return (
                          <ListItem key={key} property classes="space-x-2 py-1">
                            <p className="text-xs font-code opacity-70">
                              {key}
                            </p>
                            <p className="text-sm truncate">{value}</p>
                          </ListItem>
                        );
                      }
                    })}
                </List>
              </Section>

              <div className="py-2 space-y-2">
                {groups?.map((group) => {
                  return (
                    <Section key={group.id}>
                      <Header>
                        {group.name.charAt(0).toUpperCase() +
                          group.name.slice(1)}
                      </Header>
                      <List>
                        <ListItem>
                          <div className="w-full flex flex-col items-stretch">
                            <div className="w-full flex items-center justify-between border-b border-border dark:border-border-dark py-1 text-sm">
                              <Link
                                external
                                to={`${user.url}/groups/${group.group_type_index}/${group.id}`}
                              >
                                {group.properties?.name || group.id}
                              </Link>
                            </div>

                            {user.groupProps?.[group.group_type_index] ? (
                              <ul className="w-full pb-1">
                                {Object.entries(group.properties)
                                  .filter(
                                    ([key]) =>
                                      user.groupProps?.[
                                        group.group_type_index
                                      ].indexOf(key) !== -1
                                  )
                                  ?.map(([key, value]) => {
                                    return (
                                      <ListItem
                                        key={key}
                                        property
                                        classes="space-x-2 py-1"
                                      >
                                        <p className="text-xs font-code opacity-70">
                                          {key}
                                        </p>
                                        <p className="text-sm truncate">
                                          {value}
                                        </p>
                                      </ListItem>
                                    );
                                  })}
                              </ul>
                            ) : null}
                          </div>
                        </ListItem>
                      </List>
                    </Section>
                  );
                })}
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <FeatureFlags
                featureFlags={featureFlags}
                distinctId={person.distinct_ids[0]}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  ) : null;
};

export default Person;
