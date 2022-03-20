

export default function Home() {
  return (
      <div className="flex flex-col md:px-12 px-0 relative bg-background font-poppins items-center min-h-screen">
          <h1 className="text-6xl text-primary font-bold mt-20">
            V.R. Real Estate <span className="text-active">App</span>
          </h1>
          <h2 className="text-active text 2xl mt-6">
              Find Your Dream Home for sale anywhere in USA!!
          </h2>
          <form
          className="sm:mx-auto mt-20 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
          onSubmit={event => {
              event.preventDefault();
              event.stopPropagation();
          }}
          >
              <input
              type="text"
              className="flex w-full rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
              placeholder="Enter the location for properties eg: Kansas City"
              />

              <div className="mt-5 flex sm:flex-row flex-col justify-start">
                  <div className="sm:w-1/3 w-full">
                      <label className="block text-primary text-sm">
                          Sort by
                      </label>
                      <select className="mt-1 flex w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none">
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
                      ></input>
                  </div>
              </div>

              <button
              className="mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
              type="submit"
              >
                Search
              </button>

          </form>
      </div>
  );
}