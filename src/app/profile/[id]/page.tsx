export default function UserProfile({ params }: any) {
    return (
        <div className="text-3xl font-bold flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold  text-blue-700 text-center my-12">Welcome to MadQuick Pvt Ltd</h1>
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page
                <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
        </div>
    )
}