import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [data, setdata] = useState([])
  const [state, setstate] = useState({
    loading: false,
    page: 1,
    totaldata: 0
  })

  useEffect(() => {
    updatedata(state.page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const updatedata = async (pageno) => {
    const url = `https://randomuser.me/api/?page=${pageno}&results=10`
    setstate({ ...state, loading: true })
    setTimeout(async () => {
      let rdata = await fetch(url)
      let parsedrdata = await rdata.json()
      setdata(parsedrdata.results)
      setstate({
        ...state,
        totaldata: state.totaldata + parsedrdata.info.results,
        loading: false
      })
    }, 1000)
  }

  const fetchmore = async () => {
    const url = `https://randomuser.me/api/?page=${state.page + 1}&results=10`
    setstate({ ...state, loading: true })
    setTimeout(async () => {
      let rdata = await fetch(url)
      let parsedrdata = await rdata.json()
      setdata(data.concat(parsedrdata.results))
      setstate({
        ...state,
        totaldata: state.totaldata + parsedrdata.info.results,
        page: state.page + 1,
        loading: false
      })
    }, 1000);
  }

  return (
    <div className='text-center'>
      <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl'>Contact List :</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchmore}
        hasMore={data.length !== 50}
      >
        <div className='container py-5 px-1 mx-auto bg-gray-100 rounded-xl'>
          <div className="divide-y-2 divide-gray-100">
            {data.map((e) => {
              return <div key={e.login.uuid} className="my-1 py-4 rounded-lg bg-gray-200 flex flex-row justify-around sm:w-5/6 md:w-4/6 xl:w-1/2 items-center mx-auto">
                <img src={e.picture.large} alt="profile" className='rounded-full aspect-square w-1/5 sm:w-15 md:w-20 lg:w-25' />
                <div className='w-3/4 lg:w-1/2 text-sm sm:text-base lg:text-lg xl:text-xl'>
                  <h2 className="font-medium text-gray-900 title-font mb-2">{e.name.title + " " + e.name.first + " " + e.name.last}</h2>
                  <p className="leading-relaxed">{e.email}</p>
                </div>
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {state.loading && <Spinner />}
    </div>
  );
}

export default App;
