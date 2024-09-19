
const [loadingStates, setLoadingStates] = useState(Array(blogs.length).fill(false));

setLoadingStates((prevStates) => {
    const newLoadingStates = [...prevStates];
    newLoadingStates[selectedBlogIndex] = true;
    return newLoadingStates;
});


setLoadingStates((prevStates) => {
    const newLoadingStates = [...prevStates];
    newLoadingStates[selectedBlogIndex] = false;
    return newLoadingStates;
});