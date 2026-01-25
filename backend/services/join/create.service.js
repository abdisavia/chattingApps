import { models } from "../../model/index.js"
import { joinSchema } from "../../validators/join.validator.js"
export const createJoin = async (joinData, transaction) => {
    if (!joinData) throw new Error("ValidationError: Join data is required");
    const validation = joinSchema.validate(joinData, {abortEarly:false});
    if (validation.error) throw new Error(validation.error);
    if (transaction) {
        return models.Join.create(joinData,{transaction:transaction});
    } else {
        return models.Join.create(joinData);
    }
}