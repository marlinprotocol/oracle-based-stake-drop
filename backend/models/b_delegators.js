const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const delegator = mongoose.model(
  "b_delegators",
  new Schema({
    id: ObjectId,
    delegatorAddress: {
      type: String,
      index: true,
    },
    era: {
      type: Number,
      index: true,
    },
    delegatorStake: {
      type: Number,
    },
    totalStakeInTheEra: {
      type: Number,
    },
    pushedToChain: {
      type: Boolean,
      indexed: true,
      default: false,
    },
    validatorAddress: {
      type: String,
      indexed: true,
    },
  })
);

module.exports = delegator;
