const Icon = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <>{children}</>
)

export const Collapse = ({ className }: { className?: string }): JSX.Element => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M7.41016 18.59L8.83016 20L12.0002 16.83L15.1702 20L16.5802 18.59L12.0002 14L7.41016 18.59ZM16.5902 5.41L15.1702 4L12.0002 7.17L8.83016 4L7.41016 5.41L12.0002 10L16.5902 5.41Z" fill="currentColor"></path></svg>
)

export const Expand = ({ className }: { className?: string }): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.0002 5.83L15.1702 9L16.5802 7.59L12.0002 3L7.41016 7.59L8.83016 9L12.0002 5.83ZM12.0002 18.17L8.83016 15L7.42016 16.41L12.0002 21L16.5902 16.41L15.1702 15L12.0002 18.17Z" fill="currentColor"></path></svg>
)

export const SidecarLogo = ({ className }: { className?: string }): JSX.Element => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 209 66"><path fill="#000" d="M84.536 26h3.792v-6.288h3.168c3.48 0 5.712-2.064 5.712-5.256S94.976 9.2 91.496 9.2h-6.96V26Zm3.792-9.528V12.44h2.784c1.44 0 2.304.768 2.304 2.016s-.864 2.016-2.304 2.016h-2.784ZM104.068 26.192c3.696 0 6.384-2.64 6.384-6.24s-2.688-6.24-6.384-6.24c-3.744 0-6.384 2.64-6.384 6.24s2.64 6.24 6.384 6.24Zm-2.88-6.24c0-1.92 1.152-3.24 2.88-3.24 1.704 0 2.856 1.32 2.856 3.24 0 1.92-1.152 3.24-2.856 3.24-1.728 0-2.88-1.32-2.88-3.24ZM116.521 26.192c2.832 0 4.752-1.776 4.752-3.864 0-4.896-6.504-3.312-6.504-5.232 0-.528.552-.864 1.344-.864.816 0 1.8.504 2.112 1.608l2.832-1.176c-.552-1.752-2.592-2.952-5.064-2.952-2.664 0-4.32 1.584-4.32 3.48 0 4.584 6.408 3.312 6.408 5.208 0 .672-.624 1.128-1.56 1.128-1.344 0-2.28-.936-2.568-2.064l-2.832 1.104c.624 1.824 2.448 3.624 5.4 3.624ZM130.395 25.88l-.24-3.048c-.408.216-.936.288-1.368.288-.864 0-1.44-.624-1.44-1.704v-4.584h2.928v-2.928h-2.928V10.4h-3.528v3.504h-1.92v2.928h1.92v5.04c0 2.928 1.992 4.32 4.608 4.32.72 0 1.392-.12 1.968-.312ZM142.696 9.2v6.528h-6.672V9.2h-3.792V26h3.792v-7.032h6.672V26h3.816V9.2h-3.816ZM154.929 26.192c3.696 0 6.384-2.64 6.384-6.24s-2.688-6.24-6.384-6.24c-3.744 0-6.384 2.64-6.384 6.24s2.64 6.24 6.384 6.24Zm-2.88-6.24c0-1.92 1.152-3.24 2.88-3.24 1.704 0 2.856 1.32 2.856 3.24 0 1.92-1.152 3.24-2.856 3.24-1.728 0-2.88-1.32-2.88-3.24ZM168.122 25.616c1.32 0 2.496-.456 3.12-1.248v1.152c0 1.344-1.08 2.28-2.736 2.28-1.176 0-2.208-.576-2.376-1.56l-3.216.504c.432 2.28 2.76 3.816 5.592 3.816 3.72 0 6.192-2.184 6.192-5.424V13.904h-3.48v1.032c-.648-.744-1.752-1.224-3.168-1.224-3.36 0-5.472 2.304-5.472 5.952s2.112 5.952 5.544 5.952Zm-2.112-5.952c0-1.8 1.056-2.952 2.688-2.952 1.656 0 2.712 1.152 2.712 2.952s-1.056 2.952-2.712 2.952c-1.632 0-2.688-1.152-2.688-2.952ZM93.656 60.288c5.796 0 9.684-3.06 9.684-7.632 0-10.296-12.96-7.092-12.96-11.088 0-1.404 1.224-2.232 3.204-2.232 2.376 0 4.068 1.476 4.572 3.744l5.076-2.124c-.864-3.852-4.788-6.444-9.648-6.444-4.932 0-8.892 2.952-8.892 7.092 0 9.252 12.924 6.444 12.924 11.196 0 1.584-1.476 2.664-3.744 2.664-2.484 0-4.68-1.872-5.004-4.68L83.9 52.26c.468 4.608 4.716 8.028 9.756 8.028ZM106.067 60h5.292V41.856h-5.292V60Zm-.108-20.412h5.58v-5.076h-5.58v5.076ZM122.726 60.288c2.052 0 3.888-.792 4.824-2.088V60h5.292V34.512h-5.292v9.072c-1.008-1.224-2.7-2.016-4.896-2.016-5.256 0-8.46 3.672-8.46 9.36 0 5.688 3.204 9.36 8.532 9.36Zm-3.384-9.36c0-2.916 1.728-4.86 4.248-4.86 2.592 0 4.284 1.944 4.284 4.86 0 2.916-1.692 4.86-4.284 4.86-2.52 0-4.248-1.944-4.248-4.86ZM135.701 50.928c0 4.5 3.06 9.36 9.324 9.36 4.32 0 7.56-1.98 8.64-5.4l-4.968-1.332c-.396 1.512-1.728 2.34-3.528 2.34-2.232 0-3.744-1.224-4.248-3.456h13.032c.036-.396.072-1.26.072-1.98 0-4.032-2.772-8.892-9.324-8.892-6.264 0-9 4.86-9 9.36Zm5.292-2.232c.504-2.124 1.8-3.204 3.708-3.204 2.34 0 3.492 1.368 3.672 3.204h-7.38ZM165.266 60.288c4.788 0 8.136-2.376 8.784-6.192l-5.148-1.044c-.36 1.656-1.548 2.736-3.42 2.736-2.448 0-4.068-1.908-4.068-4.86 0-2.952 1.584-4.86 4.068-4.86 1.872 0 3.204 1.152 3.492 2.952l5.112-1.008c-.576-3.996-3.96-6.444-8.82-6.444-5.472 0-9.288 3.852-9.288 9.36 0 5.508 3.816 9.36 9.288 9.36ZM187.168 48.372v.108l-3.276.324c-5.22.54-7.848 2.484-7.848 6.084 0 3.024 2.484 5.4 6.012 5.4 2.016 0 4.068-1.008 5.112-2.592V60h5.112V49.236c0-5.112-3.348-7.668-8.28-7.668-3.888 0-7.2 2.304-7.776 5.868l4.608.864c.18-1.764 1.44-2.808 3.168-2.808 1.944 0 3.168 1.08 3.168 2.88Zm-6.084 6.336c0-1.044.9-1.944 2.7-2.124l3.384-.396V52.512c-.036 2.088-1.44 3.996-3.816 3.996-1.476 0-2.268-.792-2.268-1.8Zm6.084-2.304v-.072.072ZM208.265 46.932l.324-5.076c-.504-.18-1.332-.288-1.944-.288-2.16 0-4.5 1.476-5.328 3.42v-3.132h-5.292V60h5.292v-6.552c0-5.148 2.268-6.948 4.644-6.948.828 0 1.692.144 2.304.432Z" /><path fill="#8A8A8A" stroke="#000" strokeWidth="2.314" d="M12.099 33.334h43.587v24.45c-16.37-3.015-26.388-3.26-43.587-.007V33.334Z" /><path fill="#81C6E2" stroke="#000" strokeWidth="1.929" d="m12.591 64.173-5.09.625a3.086 3.086 0 0 1-3.417-2.545L1.3 45.878l-.001-.007c-.02-.152-5.526-42.174 31.63-42.816 38.305-.66 32.808 42.647 32.786 42.816l-.001.008-2.784 16.374a3.086 3.086 0 0 1-3.418 2.545l-5.154-.633a3.086 3.086 0 0 1-2.7-3.287l1.423-19.506c.167-2.29-1.372-4.367-3.625-4.81-12.096-2.38-20.29-2.322-32.36-.002-2.305.443-3.866 2.584-3.644 4.92l1.835 19.339a3.086 3.086 0 0 1-2.696 3.354Z" /><path fill="#fff" stroke="#000" strokeWidth="1.929" d="m12.591 64.173-4.786.588a3.086 3.086 0 0 1-3.455-2.847L3.227 45.87v-3.9c0-7.285 5.082-13.679 12.284-14.774 12.587-1.914 22.682-1.878 35.366.11 6.862 1.077 11.842 6.975 12.25 13.908l.274 4.656-.799 15.973a3.086 3.086 0 0 1-3.458 2.909l-4.785-.588a3.086 3.086 0 0 1-2.702-3.287l1.424-19.506c.167-2.29-1.372-4.367-3.625-4.81-12.096-2.38-20.29-2.322-32.36-.002-2.304.442-3.866 2.584-3.644 4.92l1.835 19.339a3.086 3.086 0 0 1-2.696 3.354Z" /><path fill="#D9D9D9" d="m12.591 64.173-.929.114a3.086 3.086 0 0 1-3.454-2.847L7.085 45.397v-3.166c0-5.464 3.82-10.236 9.2-11.18 13.296-2.33 21.24-2.145 34.292.248 5.785 1.06 9.7 6.456 9.138 12.31l-.172 1.788-.798 15.973a3.086 3.086 0 0 1-3.458 2.91l-.928-.115a3.086 3.086 0 0 1-2.702-3.287l1.424-19.506c.167-2.29-1.372-4.367-3.625-4.81-12.096-2.38-20.29-2.322-32.36-.002-2.305.442-3.866 2.584-3.644 4.92l1.835 19.339a3.086 3.086 0 0 1-2.696 3.354Z" /><path fill="#000" fillRule="evenodd" d="M50.403 32.247C37.455 29.873 29.627 29.69 16.453 32c-4.898.859-8.404 5.21-8.404 10.229v3.133l1.12 16.009a2.121 2.121 0 0 0 2.375 1.957l.93-.114a2.122 2.122 0 0 0 1.853-2.306l-1.835-19.34c-.267-2.815 1.616-5.418 4.421-5.957 12.188-2.342 20.507-2.402 32.73.003 2.745.54 4.601 3.065 4.4 5.827l-1.424 19.505a2.122 2.122 0 0 0 1.857 2.26l.928.114a2.121 2.121 0 0 0 2.378-2l.8-15.995.173-1.81c.516-5.376-3.08-10.302-8.352-11.27ZM16.119 30.1c13.416-2.352 21.475-2.163 34.632.249 6.297 1.154 10.531 7.018 9.924 13.351l-.17 1.766-.797 15.951a4.05 4.05 0 0 1-4.539 3.818l-.928-.114a4.05 4.05 0 0 1-3.546-4.315L52.12 41.3c.133-1.819-1.088-3.448-2.85-3.794-11.969-2.355-20.038-2.298-31.992 0-1.802.345-3.041 2.026-2.865 3.88l1.835 19.34a4.05 4.05 0 0 1-3.538 4.403l-.93.114a4.05 4.05 0 0 1-4.533-3.737L6.12 45.43v-3.2c0-5.908 4.134-11.1 9.999-12.129Z" clipRule="evenodd" /><path fill="#fff" stroke="#000" strokeWidth="2.314" d="M41.862 25.981c-6.313-.367-10.03-.365-16.344 0a.388.388 0 0 1-.41-.385V4.333c0-.183.13-.341.31-.378 6.407-1.299 10.136-1.248 16.542.002.18.036.313.195.313.379v21.26a.388.388 0 0 1-.41.385Z" /></svg>
)

export const PostHogLogomark = ({ className }: { className?: string }): JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 30"><path fill="#1D4AFF" d="M10.891 17.206a1 1 0 0 1-1.788 0l-.882-1.763a1 1 0 0 1 0-.894l.882-1.763a1 1 0 0 1 1.788 0l.882 1.763a1 1 0 0 1 0 .894l-.882 1.763ZM10.891 27.203a1 1 0 0 1-1.788 0L8.22 25.44a1 1 0 0 1 0-.895l.882-1.762a1 1 0 0 1 1.788 0l.882 1.762a1 1 0 0 1 0 .895l-.882 1.763Z" /><path fill="#F9BD2B" d="M0 23.408c0-.89 1.077-1.337 1.707-.707l4.583 4.584c.63.63.184 1.707-.707 1.707H1a1 1 0 0 1-1-1v-4.584Zm0-4.828a1 1 0 0 0 .293.708l9.411 9.41a1 1 0 0 0 .707.294h5.17c.89 0 1.337-1.078.707-1.707l-14.58-14.58C1.077 12.074 0 12.52 0 13.41v5.17Zm0-9.997a1 1 0 0 0 .293.707L19.7 28.7a1 1 0 0 0 .707.293h5.17c.89 0 1.337-1.078.707-1.707L1.707 2.707C1.077 2.077 0 2.523 0 3.414v5.17Zm9.997 0a1 1 0 0 0 .293.707l17.994 17.995c.63.63 1.707.183 1.707-.708v-5.169a1 1 0 0 0-.293-.707L11.704 2.707c-.63-.63-1.707-.184-1.707.707v5.17Zm11.704-5.876c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.706l7.997 7.998c.63.63 1.707.183 1.707-.708v-5.169a1 1 0 0 0-.293-.707l-7.997-7.997Z" /><path fill="#000" d="m42.525 23.53-9.413-9.412c-.63-.63-1.707-.184-1.707.707v13.166a1 1 0 0 0 1 1h14.58a1 1 0 0 0 1-1v-1.198c0-.553-.449-.994-.997-1.065a7.724 7.724 0 0 1-4.463-2.197Zm-6.322 2.262a1.6 1.6 0 1 1 .002-3.2 1.6 1.6 0 0 1-.002 3.2Z" /><path fill="#1D4AFF" d="M0 27.991a1 1 0 0 0 1 1h4.583c.891 0 1.337-1.077.707-1.707l-4.583-4.583c-.63-.63-1.707-.184-1.707.707v4.583ZM9.997 10.997l-8.29-8.29C1.077 2.077 0 2.523 0 3.414v5.17a1 1 0 0 0 .293.706l9.704 9.705v-7.998ZM1.707 12.704c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.707l9.704 9.704v-7.998l-8.29-8.29Z" /><path fill="#F54E00" d="M19.994 11.411a1 1 0 0 0-.293-.707l-7.997-7.997c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.706l9.704 9.705V11.41ZM9.997 28.991h5.583c.891 0 1.338-1.077.708-1.707l-6.291-6.29v7.997ZM9.997 10.997v7.584a1 1 0 0 0 .293.707l9.704 9.704v-7.584a1 1 0 0 0-.293-.707l-9.704-9.704Z" /><path fill="#000" d="M59.65 25h4.108v-6.812h3.432c3.77 0 6.188-2.236 6.188-5.694 0-3.458-2.418-5.694-6.188-5.694h-7.54V25Zm4.108-10.322V10.31h3.016c1.56 0 2.496.832 2.496 2.184 0 1.352-.936 2.184-2.496 2.184h-3.016ZM80.81 25.208c4.004 0 6.915-2.86 6.915-6.76s-2.911-6.76-6.915-6.76c-4.056 0-6.916 2.86-6.916 6.76s2.86 6.76 6.915 6.76Zm-3.12-6.76c0-2.08 1.248-3.51 3.12-3.51 1.846 0 3.093 1.43 3.093 3.51s-1.248 3.51-3.094 3.51c-1.871 0-3.12-1.43-3.12-3.51ZM94.3 25.208c3.068 0 5.148-1.924 5.148-4.186 0-5.304-7.046-3.588-7.046-5.668 0-.572.597-.936 1.456-.936.883 0 1.95.546 2.287 1.742l3.069-1.274c-.599-1.898-2.808-3.198-5.486-3.198-2.886 0-4.68 1.716-4.68 3.77 0 4.966 6.942 3.588 6.942 5.642 0 .728-.676 1.222-1.69 1.222-1.456 0-2.47-1.014-2.782-2.236l-3.069 1.196c.677 1.976 2.653 3.926 5.85 3.926ZM109.33 24.87l-.26-3.302c-.442.234-1.014.312-1.482.312-.936 0-1.56-.676-1.56-1.846v-4.966h3.172v-3.172h-3.172V8.1h-3.822v3.796h-2.08v3.172h2.08v5.46c0 3.172 2.158 4.68 4.992 4.68.78 0 1.508-.13 2.132-.338ZM122.656 6.8v7.072h-7.228V6.8h-4.108V25h4.108v-7.618h7.228V25h4.134V6.8h-4.134ZM135.908 25.208c4.004 0 6.916-2.86 6.916-6.76s-2.912-6.76-6.916-6.76c-4.056 0-6.916 2.86-6.916 6.76s2.86 6.76 6.916 6.76Zm-3.12-6.76c0-2.08 1.248-3.51 3.12-3.51 1.846 0 3.094 1.43 3.094 3.51s-1.248 3.51-3.094 3.51c-1.872 0-3.12-1.43-3.12-3.51ZM150.201 24.584c1.43 0 2.704-.494 3.38-1.352v1.248c0 1.456-1.17 2.47-2.964 2.47-1.274 0-2.392-.624-2.574-1.69l-3.484.546c.468 2.47 2.99 4.134 6.058 4.134 4.03 0 6.708-2.366 6.708-5.876V11.896h-3.77v1.118c-.702-.806-1.898-1.326-3.432-1.326-3.64 0-5.928 2.496-5.928 6.448 0 3.952 2.288 6.448 6.006 6.448Zm-2.288-6.448c0-1.95 1.144-3.198 2.912-3.198 1.794 0 2.938 1.248 2.938 3.198s-1.144 3.198-2.938 3.198c-1.768 0-2.912-1.248-2.912-3.198Z" /></svg>
)
