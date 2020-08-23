const gCategories: { name: string, link: string }[] = [
  { name: 'New Project', link: '/newproject' },
  { name: 'My Project', link: '/' },
  { name: 'Blank1', link: '/' },
  { name: 'Blank2', link: '/' },
];

const getCategories = () => {
    return gCategories;
};

export const globalService = {
  getCategories,
};
