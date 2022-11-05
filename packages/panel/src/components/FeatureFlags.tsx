import Header from "./Header";
import Section from "./Section";
import List from "./List";
import ListItem from "./ListItem";
import Link from "./Link";

import { useUser } from "./UserProvider";

export type FeatureFlagsData = Record<
  string,
  {
    value: any;
    evaluation: {
      reason: string;
      condition_index: number;
    };
  }
>;

const FeatureFlags: React.FC<{
  distinctId: string;
  featureFlags: FeatureFlagsData | undefined;
}> = ({ distinctId, featureFlags }) => {
  const { user } = useUser();

  const displayFeatureFlagValue = (flag: FeatureFlagsData[string]) => {
    return typeof flag.value === "boolean"
      ? JSON.stringify(flag.value)
      : flag.value;
  };

  return (
    <Section>
      <Header link={`${user?.url}/person/${distinctId}#activeTab=featureFlags`}>
        Feature flags
      </Header>
      {featureFlags ? (
        <List>
          {Object.entries(featureFlags)
            .slice(0, 20)
            .map(([key, value]) => {
              return (
                <ListItem key={key} flag>
                  <Link
                    to={`${user?.url}/person/${distinctId}#activeTab=featureFlags`}
                    flag
                    external
                  >
                    <div className="w-full flex items-center justify-between">
                      <span className="block">{key}</span>
                      <span className="block text-gray-800 bg-gray-100 py-0.5 px-1 rounded font-code text-xs">
                        {displayFeatureFlagValue(value)}
                      </span>
                    </div>
                  </Link>
                </ListItem>
              );
            })}
        </List>
      ) : null}
    </Section>
  );
};

export default FeatureFlags;
