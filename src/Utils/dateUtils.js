import moment from "moment";
// sendAt revive value from -  new Date().toISOString()
export const formatCustomDate = (sendAt) => {
  return moment(sendAt).format("dddd , D MMM YYYY");
};
