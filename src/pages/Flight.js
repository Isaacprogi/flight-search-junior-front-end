import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsAirplane } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsClock } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { MoonLoader } from 'react-spinners'
const Flight = () => {
    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)


    // const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const delay = 100; // Adjust the delay as needed (in milliseconds)
    // let timeoutId;



    const querySearch = (value) => {
        setLoading(true)
        const apiUrl = `https://flight-backend-api.onrender.com/flights?query=${value}`;
        axios.get(apiUrl)
            .then(response => {
                setResults(response.data.results);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Error fetching data:', error);
            });
    }

    // const handleSearch = (value) => {
    //     clearTimeout(timeoutId);

    //     // Set the debounced value after the specified delay
    //     timeoutId = setTimeout(() => {
    //       setDebouncedSearchValue(value);
    //     }, delay);
    //   };


    //   useEffect(() => {
    //     if (debouncedSearchValue !== '') {
    //       querySearch(debouncedSearchValue);
    //     }
    //   }, [debouncedSearchValue]);





    const cleanContent = (inputString) => {
        if (inputString) {
            const extractedContent = inputString.match(/\((.*?)\)/)?.[1] || '';
            return extractedContent.replace(/\s+/g, '');
        }
    };

    const cleanContent2 = (inputString) => {
        if (inputString) {
            return inputString.replace(/\(.*?\)/g, '');
        }
    };


    return (
        <div className=" bg-gray-800  w-full min-h-full">
            <div className='text-gray-300 bg-gray-900 h-[4rem] flex items-center justify-center w-full text-2xl'>
                Flight Search
            </div>

            <div className="w-full mt-2 flex items-center justify-center">
                <div className='flex itemsc-center justify-between w-full border-2 border-grey-600 max-w-[25rem] rounded-full overflow-hidden bg-gray-700'>

                    <input
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            querySearch(e.target.value);
                        }}
                        type="text"
                        className='outline-none text-gray-300 flex-1 p-3 bg-gray-700'
                    />
                    <button className='p-2 hover:text-red-500 text-gray-300 duration-300 '>
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-wrap custom-scrollbar justify-center gap-2 pl-[1rem] pt-[1rem] overflow-hidden pb-2 items-center">
                <div className='px-2  min-w-[20rem] max-w-[20rem] h-[20rem] shadow-sm shadow-gray-600 rounded-md  overflow-y-auto bg-gray-900'>
                    <div className='text-white sticky top-0 bg-gray-900 left-0'>Airports</div>
                    {
                        !loading && results?.map((result) => {
                            return result.type === 'airport' ?
                                <div className='w-full flex gap-2 mb-[1rem]  hover:scale-[102%] hover:opacity-[.7] duration-300 rounded-md overflow-hidden flex-col'>
                                    <span className='bg-red-500 flex w-full h-[3.1rem]'>
                                        <div className='w-[3rem] text-xl flex items-center justify-center flex-none bg-yellow-300'>
                                            <HiOutlineLocationMarker />
                                        </div>
                                        <div className="flex-auto px-1 bg-gray-700">
                                            <h1 className='text-blue-300'>{cleanContent2(result.label)}</h1>
                                            <div className='rounded-md border-2 px-2 text-gray-200 ml-1 text-[.8rem] w-[max-content] border-gray-300'>{cleanContent(result.label)}</div>
                                        </div>
                                    </span>
                                </div> : ''
                        })
                    }
                    {
                        loading && <div className='w-full h-[15rem] flex items-center justify-center'>
                            <MoonLoader
                                size={40}
                                color={'yellow'}
                            />
                        </div>
                    }



                </div>
                <div className='px-2  min-w-[20rem] max-w-[20rem] h-[20rem]  custom-scrollbar shadow-sm shadow-gray-600 rounded-md  overflow-y-auto bg-gray-900'>
                    <div className='text-white sticky top-0 bg-gray-900 left-0'>Airplanes</div>
                    {
                        !loading && results?.map((result) => {
                            return result.type === 'operator' ?
                                <div className='w-full flex gap-2 mb-[1rem]  hover:scale-[102%] hover:opacity-[.7] duration-300 rounded-md overflow-hidden flex-col'>
                                    <span className='bg-red-500 flex w-full h-[3.1rem]'>
                                        <div className='w-[3rem] text-xl flex items-center justify-center flex-none bg-yellow-300'>
                                            <BsAirplane />
                                        </div>
                                        <div className="flex-auto flex items-center justify-start px-1 bg-gray-700">
                                            <h1 className='text-blue-300'>{cleanContent2(result.label)}</h1>
                                            <div className='rounded-md border-2 px-2 text-gray-200 ml-1 text-[.8rem] w-[max-content] border-gray-300'>{cleanContent(result.label)}</div>
                                        </div>
                                    </span>
                                </div> : ''
                        })
                    }
                    {
                        loading && <div className='w-full h-[15rem] flex items-center justify-center'>
                         <MoonLoader
                                size={40}
                                color={'blue'}
                            />
                    </div>
                    }


                </div>
                <div className='px-2  min-w-[20rem] h-[20rem] custom-scrollbar shadow-sm shadow-gray-600 rounded-md relative  overflow-y-auto bg-gray-900'>
                    <div className='text-white sticky top-0 bg-gray-900 left-0'>Recent or scheduled flights</div>
                    {
                        !loading && results?.map((result) => {
                            return result.type === 'schedule' ?
                                <div className='w-full hover:scale-[102%] hover:opacity-[.7] duration-300  flex gap-2 mb-[1rem] rounded-md overflow-hidden flex-col'>
                                    <span className='bg-red-500 flex w-full h-[3.1rem]'>
                                        <div className='w-[3rem] text-xl flex items-center justify-center flex-none bg-yellow-300'>
                                            <BsClock />
                                        </div>
                                        <div className="flex-auto flex items-center justify-start px-1 bg-gray-700">
                                            <h1 className='text-blue-300 font-[500]'>{result.label}</h1>
                                        </div>
                                    </span>
                                </div> : ''
                        })
                    }
                    {
                        loading && <div className=' h-[15rem] flex items-center justify-center'>
                        <MoonLoader
                                size={40}
                                color={'white'}
                            />
                    </div>
                    }


                </div>




            </div>

        </div>
    )
}

export default Flight