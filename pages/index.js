import {useState} from 'react';
import axios from 'axios';

export default function Home() {
    const [keyword, setKeyword] = useState(null);
    const [sort, setSort] = useState(null);
    const [bedrooms, setBedrooms] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const getProperties = async () => {
        try {
            setLoading(true);
            // Request the location endpoint to get location based on input keyword
            const location = await axios.get("api/location/", {
                params: { keyword },
            });
            const {city, state_code} = location.data.autocomplete[0]; // Extract city and state from the response
            // Request the properties endpoint to get available properties
            const res = await axios.get('api/properties/', {
                params: {city, state_code, sort, bedrooms }, // Set parameters
            });
            const {data} = res;
            setLoading(false);
            setResponse(data.listings); // Set response
        } catch (error) {
            setLoading(false);
        }
    };

  return (
      <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen">
          <h1 className="text-6xl text-primary font-bold mt-20">
            V.R. Real Estate Listing <span className="text-active">App</span>
          </h1>
          <h2 className="text-active text 2xl mt-6">
              Find Your Dream Home for sale anywhere in USA!!
          </h2>
          <form
          className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
          onSubmit={(event) => {
              getProperties();
              event.preventDefault(); // Allow enter key to submit the form
              event.stopPropagation();
          }}
          >
              <input
              type="text"
              className="flex w-full rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
              placeholder="Enter the location for properties eg: Kansas City"
              onChange={(event) => {
                  setKeyword(event.target.value);
                  setResponse(null);
              }}
              />

              <div className="mt-5 flex sm:flex-row flex-col justify-start">
                  <div className="sm:w-1/3 w-full">
                      <label className="block text-primary text-sm">
                          Sort by
                      </label>
                      <select
                          className="mt-1 flex w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none"
                          onChange={(event) => setSort(event.target.value)} //Store value in state
                      >
                          {[
                              'relevance',
                              'newest',
                              'price_high',
                              'price_low',
                              'price_reduced_date',
                              'sq.ft_high',
                              'open_house_date',
                              'photos'
                          ].map(value => {
                              return <option value={value}>{value}</option>;
                          })}
                      </select>
                  </div>
                  <div className="sm:ml-10 sm:w-1/3 w-full">
                      <label className="block text-primary text-sm">
                          Minimum Bedrooms
                      </label>
                      <input
                      type="number"
                      className="mt-1 w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none"
                      placeholder="1"
                      onChange={(event) => setBedrooms(event.target.value)} //Store value in state
                      ></input>
                  </div>
              </div>

              <button
              className="mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
              type="submit"
              >
                  {loading ? <>Loading..</> : <>Search</>}
              </button>
          </form>
          {response && (
              <div className="mt-10">
                  <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {response.map(property => (
                          <div key={property.property_id} className="pt-6">
                              <div className="flow-root bg-light rounded-lg px-4 pb-8">
                                  <div className="mt-6">
                                      <div className="flex items-center justify-center">
                                          <span className="p-2">
                                              <img
                                              src={property.photo}
                                              className="w-full h-full rounded-lg"
                                              />
                                          </span>
                                      </div>
                                      <div className="text-center justify-center items-center">
                                          <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-active tracking-tight">
                                              {property.short_price}{' '}
                                              {property.prop_type}
                                          </h3>
                                          <span className="mt-2 text-sm font-bold text-primary block">
                                              {property.address}
                                          </span>
                                          <a
                                          className="mt-4 text-sm text-active block"
                                          href={property.rdc_web_url}
                                          >
                                              Details

                                          </a>

                                      </div>

                                  </div>

                              </div>

                          </div>
                      ))}

                  </div>

              </div>
          )}
      </div>
  );
}