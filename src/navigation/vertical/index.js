export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
    children: [
      {
        title: 'Alpa',
        route: { name: 'project-alpa' },
        icon: 'FileIcon',
      },
      {
        title: 'Thor',
        route: { name: 'project-thor' },
        icon: 'FileIcon',
      },
    ],
  },
]
