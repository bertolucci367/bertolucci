import xw from 'xwind'

interface ContainerProps {
  children?: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <div
      css={[
        `
          grid-template-columns: 12px 1fr 12px;
          @media (min-width: 1024px) {
            grid-template-columns: 0 1fr 0;
          }
        `,
        xw`col-start-1 col-end-4 bg-white sticky top-0 grid z-40`,
      ]}
    >
      <div css={xw`col-start-2 relative`}>{children}</div>
    </div>
  )
}

export default Container
