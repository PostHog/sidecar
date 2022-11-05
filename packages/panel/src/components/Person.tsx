import { useState, useEffect } from "react";

import expand from "../assets/expand.svg";
import collapse from "../assets/collapse.svg";

import FeatureFlags, { FeatureFlagsData } from "./FeatureFlags";
import Section from "./Section";
import Header from "./Header";
import List from "./List";
import ListItem from "./ListItem";
import Link from "./Link";
import Event from "./Event";

import { Tab } from "@headlessui/react";

import { useUser } from "./UserProvider";
import { humanFriendlyDetailedTime } from "../utils";
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
};

const tabs = [
  "Properties",
  "Related Groups",
  "Feature Flags",
  "Recordings",
  "Events",
];

const Person: React.FC<{ person: PersonData }> = ({ person }) => {
  const { user } = useUser();

  const personPropsToShow = user?.personProps
    ? new Set(user.personProps)
    : undefined;

  const [expanded, setExpanded] = useState(false);

  const [featureFlags, setFeatureFlags] = useState<
    FeatureFlagsData | undefined
  >(undefined);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (expanded && user) {
      if (!recordings.length) {
        fetch(
          `${user.url}/api/projects/@current/session_recordings?person_uuid=${person.uuid}&limit=5`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setRecordings(data.results));
      }

      if (!featureFlags) {
        fetch(
          `${user.url}/api/projects/@current/feature_flags/evaluation_reasons?distinct_id=${person.distinct_ids[0]}`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setFeatureFlags(data));
      }

      if (!events.length) {
        fetch(
          `${user.url}/api/projects/@current/events?person_id=${person.id}&orderBy=["-timestamp"]&limit=10`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setEvents(data.results));
      }

      if (!groups.length) {
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
      <div className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-light-gray hover:scale-[1.01] relative active:top-[0.5px] active:scale-[1]">
        <button
          className="shrink-0 hover:bg-accent/5 active:bg-accent/10 rounded p-1"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <img src={expanded ? collapse : expand} className="w-6 h-6" />
          <span className="sr-only">Expand person</span>
        </button>
        <div
          onClick={() => setExpanded((expanded) => !expanded)}
          className="cursor-pointer"
        >
          <span className="text-[15px]">{person.name}</span>
          <a
            href={`${user.url}/person/${person.distinct_ids[0]}`}
            className="font-semibold text-sm ml-0.5 mt-1 text-black/30 hover:text-black/60 p-0.5 hover:bg-accent/20 rounded-sm"
          >
            <span className="inline-block -rotate-45">→</span>
          </a>
          <p className="text-xs font-code opacity-60">
            {person.distinct_ids[0]}
          </p>
        </div>
      </div>

      {expanded && (
        <Tab.Group>
          <Tab.List className="flex items-center justify-around border-b mb-2">
            {tabs.map((tab) => (
              <Tab key={tab} as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "text-primary border-b border-primary py-1"
                        : ""
                    } text-sm`}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel as="div">
              <Section>
                <Header>Properties</Header>
                <List>
                  {Object.entries(person.properties)
                    .filter(([key]) =>
                      personPropsToShow ? personPropsToShow.has(key) : true
                    )
                    .map(([key, value]) => {
                      if (typeof value !== "object") {
                        return (
                          <ListItem key={key} property classes="space-x-2">
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
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-2">
                {groups.map((group) => {
                  return (
                    <Section key={group.id}>
                      <Header>
                        {group.name.charAt(0).toUpperCase() +
                          group.name.slice(1)}
                      </Header>
                      <List>
                        <ListItem>
                          <div className="w-full flex flex-col items-stretch">
                            <div className="w-full flex items-center justify-between border-b py-1 text-sm">
                              <Link
                                external
                                to={`${user.url}/groups/${group.group_type_index}/${group.id}`}
                              >
                                {group.properties?.name || group.id}
                              </Link>
                            </div>

                            {user.groupProps?.[group.group_type_index] ? (
                              <ul className="w-full pb-2">
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
                                        classes="space-x-2"
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
              <FeatureFlags featureFlags={featureFlags} />
            </Tab.Panel>

            <Tab.Panel>
              <Section>
                <Header link="#">Recordings</Header>
                {recordings.length ? (
                  <List>
                    {recordings.map((recording) => {
                      return (
                        <ListItem key={recording.id} recording>
                          <Link
                            to={`${user.url}/person/${person.distinct_ids[0]}#activeTab=sessionRecordings&sessionRecordingId=${recording.id}`}
                            recording
                            external
                          >
                            {humanFriendlyDetailedTime(
                              recording.start_time,
                              "MMMM DD, YYYY",
                              "h:mm A"
                            )}
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : null}
              </Section>
            </Tab.Panel>

            <Tab.Panel>
              <Section>
                <Header>Events</Header>
                {events.length ? (
                  <List>
                    {events.map((event) => {
                      return (
                        <ListItem key={event.id} event>
                          <Event>{event.event}</Event>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : null}
              </Section>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  ) : null;
};

export default Person;
