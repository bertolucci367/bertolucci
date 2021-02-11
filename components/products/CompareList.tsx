import { useEffect, useState, useCallback } from 'react'
import { useAppContext } from '~/components/context/AppContext'
import xw from 'xwind'

const CompareList = () => {
  const shared = useAppContext()
  return (
    <div css={xw`text-12px`}>
      <h2 css={xw`font-medium mb-2`}>
        Acessar seleção de produtos: {shared.compare.length}
      </h2>
      <ul>
        {shared.compare.map((val) => (
          <li key={val}>{val}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompareList
