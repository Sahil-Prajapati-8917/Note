

export const Divider = ({ vertical = false }: { vertical?: boolean }) => {
    return (
        <div
            style={{
                width: vertical ? '1px' : '100%',
                height: vertical ? '100%' : '1px',
                backgroundColor: 'var(--border-subtle)',
                margin: vertical ? '0 8px' : '8px 0',
            }}
        />
    );
};
