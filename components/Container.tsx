import style from './Container.module.css'

interface ContainerProps {
  children?: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <div
      className={`col-start-1 col-end-4 bg-white sticky top-0 grid z-40 ${style.template}`}
    >
      <div className={`col-start-2 relative`}>{children}</div>
    </div>
  )
}

export default Container
