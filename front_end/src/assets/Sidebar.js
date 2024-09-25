export const toggleSubmenu = (index, activeSubmenu, setActiveSubmenu) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
}