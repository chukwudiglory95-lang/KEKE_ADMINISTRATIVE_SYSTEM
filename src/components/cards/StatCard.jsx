function StatCard({

  title,

  value,

  icon,

  color,

}) {

  return (

    <div
     className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            min-h-[180px]
            "
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {value}

          </h2>

        </div>

        <div
          className="w-14 h-14 rounded-xl flex justify-center items-center"
          style={{
            background: color,
          }}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

export default StatCard;