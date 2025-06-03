/**
 * @param data: User[]
 *
 * @returns User[]
 */
exports.preprocessUserData = (data) => {
  return data.map((user) => {
    const { _id, languages, interests, subjects } = user;
    return { id: _id.toString(), languages, interests, subjects };
  });
};
