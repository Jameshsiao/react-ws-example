import { useState, useRef, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { orderBy, throttle } from 'lodash'

const FTX_WS_API = 'wss://ftx.com/ws/'

const useGlobalWebsocket = () => {
  const [trades, setTrades] = useState([])
  const [ticker, setTicker] = useState()
  const _trades = useRef([])
  const {
    sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(FTX_WS_API, { share: true, retryOnError: true })

  useEffect(() => {
    switch (lastJsonMessage?.channel) {
      case 'trades':
        if (lastJsonMessage.type === 'update') {
          _trades.current = [...orderBy(lastJsonMessage.data, ['id'], 'desc'), ..._trades.current]
        } else if (lastJsonMessage.type === 'unsubscribed') {
          _trades.current = []
        }
        throttle(() => setTrades(_trades.current), 200)()
        break
      case 'ticker':
        if (lastJsonMessage.type === 'update') {
          throttle(() => setTicker(lastJsonMessage.data))()
        }
        break
      default:
    }
  }, [lastJsonMessage])

  return {
    sendMessage,
    sendJsonMessage,
    trades,
    ticker,
    readyState,
    getWebSocket
  }
}
export default useGlobalWebsocket