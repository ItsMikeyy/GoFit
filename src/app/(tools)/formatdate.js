const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

export default formatDate;