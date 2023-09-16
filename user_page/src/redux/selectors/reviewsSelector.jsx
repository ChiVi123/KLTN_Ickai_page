import { typeState } from '../variables';

export const getReviewsByAdmin = (state = typeState) => state.reviews.admin;
export const getReviewByProductId = (state = typeState) => state.reviews.item;
