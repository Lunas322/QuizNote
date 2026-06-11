import { useAuth } from "../hooks/useAuth"

function ProfileCard () {
        const user = useAuth()
    return(
            <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl">
          👤
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.user?.displayName}
          </h1>

          <p className="mt-1 text-gray-500">
            {user.user?.email}
          </p>
        </div>
      </div>
    </div>
    )
}
export default ProfileCard