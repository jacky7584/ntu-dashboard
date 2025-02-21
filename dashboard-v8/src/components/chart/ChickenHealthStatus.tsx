export default function ChickenHealthStatus({ farms }: { farms: { id: number, name: string, health: number, total: number }[] }) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => {
          const healthColor =
            farm.health > 80 ? "bg-green-400" : farm.health > 50 ? "bg-yellow-400" : "bg-red-500";
  
          return (
            <div key={farm.id} className="relative w-full overflow-hidden bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span className={`relative rounded-full ${healthColor} p-3`}>
                    <svg
                      width="20"
                      fill="currentColor"
                      height="20"
                      className="absolute left-1/2 top-1/2 h-5 -translate-x-1/2 -translate-y-1/2 text-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 10h-5V5c0-.55-.45-1-1-1s-1 .45-1 1v5H7c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z"/>
                    </svg>
                  </span>
                  <p className="ml-2 text-sm font-semibold text-gray-700 gap-4 w-10">{farm.name}</p>
                </div>
                <div className="text-lg font-bold text-black ml-4">{farm.health}/{farm.total}</div>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-md mt-3">
                <div className={`h-full ${healthColor} rounded-md`} style={{ width: `${farm.health}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  