import Header from "./Header";
import Section from "./Section";
import List from "./List";
import ListItem from "./ListItem";
import Link from "./Link";

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
  featureFlags: FeatureFlagsData | undefined;
}> = ({ featureFlags }) => {
  const displayFeatureFlagValue = (flag: FeatureFlagsData[string]) => {
    return typeof flag.value === "boolean"
      ? JSON.stringify(flag.value)
      : flag.value;
  };

  return (
    <Section>
      <Header link="#">Feature flags</Header>
      {featureFlags ? (
        <List>
          {Object.entries(featureFlags)
            .slice(0, 10)
            .map(([key, value]) => {
              return (
                <ListItem key={key} flag>
                  <Link to="#" flag external>
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
