export const helpers = {
  // truncateAddress: (address = "", start = 5, end = 4) => {
  //   if (!address) return "";
  //   return (
  //     address.substr(0, start) +
  //     "..." +
  //     address.substr(address.length - end, end)
  //   );
  // },
  getFilterPriceText(filterValue) {
    if (!filterValue) return;
    if (filterValue == "lowerThan500k") return "Dưới 500k";
    else if (filterValue == "between500kAnd1mil") return "Từ 500k đến 1 triệu";
    else if (filterValue == "between1mAnd5mil") return "Từ 1 triệu đến 5 triệu";
    else if (filterValue == "over5mil") return "Từ 5 triệu trở lên";
    return "Giá khác";
  },
};
