
export const classesNavbarLinks = `relative inline-block
cursor-pointer
mx-4 font-semibold
text-gray-700
transition-all duration-300 ease-out

hover:text-sky-900
hover:-translate-y-[1px]
hover:drop-shadow-[0_4px_12px_rgba(79,70,229,0.35)]

after:content-['']
after:absolute
after:left-1/2
after:-bottom-1
after:h-[2px]
after:w-0
after:bg-gradient-to-r
after:from-sky-500
after:to-sky-300
after:transition-all
after:duration-300
after:ease-out
after:-translate-x-1/2

hover:after:w-full`;

export const roles = [
    'admin',
    'clinic',
    'doctor',
    'patient'
]

export const regRoles = roles.map(r => ({ values: r, label: r }))