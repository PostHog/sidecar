import { useState, useEffect } from "react";

import TaxonomicFilter from "./TaxonomicFilter";
import { useUser } from "./UserProvider";

type ConfigureProps = {
  next: () => void;
};

type PersonProperty = {
  name: string;
  count: number;
};

type Group = {
  group_type: string;
  group_type_index: number;
  name_singular: string | null;
  name_plural: string;
  properties: {
    name: string;
    count: number;
  }[];
};

const Configure: React.FC<ConfigureProps> = ({ next }) => {
  const { user, updateUser } = useUser();

  const [personProperties, setPersonProperties] = useState<string[]>(
    user?.personProps || []
  );
  const [definitions, setDefinitions] = useState<PersonProperty[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const [groupProperties, setGroupProperties] = useState<
    Record<string, string[]>
  >(user?.groupProps || {});

  useEffect(() => {
    if (user) {
      fetch(`${user.url}/api/projects/@current/persons/properties`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      })
        .then((res) => res.json())
        .then((data) => setDefinitions(data));

      fetch(`${user.url}/api/projects/@current/groups_types`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      })
        .then((res) => res.json())
        .then((groupTypes) => {
          fetch(
            `${user.url}/api/projects/@current/groups/property_definitions`,
            {
              headers: { Authorization: `Bearer ${user.apiKey}` },
            }
          )
            .then((res) => res.json())
            .then((groupProps) => {
              setGroups(
                groupTypes.map((group: any) => {
                  return {
                    ...group,
                    properties: groupProps[group.group_type_index.toString()],
                  };
                })
              );
            });
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateUser({
      personProps: personProperties,
      groupProps: groupProperties,
    } as any);

    next();
  };

  return (
    <div className="min-h-full py-16 flex flex-col space-y-6 px-6 bg-light-gray">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          Which properties are important to you?
        </h1>
        <p className="text-black/70">
          Just choose the ones with helpful context when talking to customers.
          (You can change these later.)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TaxonomicFilter
          label="Key person properties"
          values={definitions.map((value) => value.name)}
          selected={personProperties}
          onChange={setPersonProperties}
          displayValue={(def) => def}
          placeholder="Search person properties..."
          filter={(query, value) =>
            value.toLowerCase().includes(query.toLocaleLowerCase())
          }
        />

        {groups.map((group) => {
          return (
            <TaxonomicFilter
              label={`Key ${group.group_type} properties`}
              placeholder={`Search ${group.group_type} properties...`}
              values={group.properties.map(({ name }) => name)}
              selected={
                groupProperties[group.group_type_index.toString()] || []
              }
              onChange={(values) =>
                setGroupProperties((groups) => {
                  return {
                    ...groups,
                    [group.group_type_index.toString()]: values,
                  };
                })
              }
              displayValue={(def) => def}
              filter={(query, value) =>
                value.toLowerCase().includes(query.toLocaleLowerCase())
              }
            />
          );
        })}

        <button
          type="submit"
          className="bg-primary rounded w-full py-2 text-white disabled:bg-blue-200 mt-10 box-border"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Configure;
