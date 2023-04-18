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
  const [groupTypes, setGroupTypes] = useState<Group[]>([]);

  const [groupProperties, setGroupProperties] = useState<
    Record<string, string[]>
  >(user?.groupProps || {});

  const fetchProperties = async () => {
    if (user) {
      const personProperties = await fetch(`${user.url}/api/projects/@current/property_definitions?type=person`, {
          headers: { Authorization: `Bearer ${user.apiKey}` },
      }).then(res => res.json());

      setDefinitions(personProperties.results);

      const groupTypes = await fetch(`${user.url}/api/projects/@current/groups_types`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      }).then((res) => res.json())

      for await (let groupType of groupTypes) {
        const groupProperties = await fetch(`${user.url}/api/projects/@current/property_definitions?limit=50&group_type_index=0&offset=50&type=group`, {
          headers: { Authorization: `Bearer ${user.apiKey}` },
        }).then((res) => res.json())

        console.log(groupProperties)
        setGroupTypes(groups => [...groups, {
              ...groupType,
              properties: groupProperties.results
          }])
      }
    }
  }

  useEffect(() => {
      fetchProperties()
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

        {groupTypes.map((group) => {
          return (
            <TaxonomicFilter
              key={group.group_type_index}
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
          className="bg-primary rounded w-full py-2 text-white text-[15px] disabled:bg-blue-200 mt-10 font-bold box-border relative hover:scale-[1.005] active:top-[0.5px] active:scale-[1]"
        >
          Save &amp; launch PostHog Sidecar &nbsp;🚀
        </button>
      </form>
    </div>
  );
};

export default Configure;
