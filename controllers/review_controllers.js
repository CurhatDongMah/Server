const { Review, Therapist } = require('../models/index')

class ReviewController {
  static create(req, res, next) {
    const ClientId = +req.params.id
    // console.log('masuk review create')
    const { TherapistId, rating, review } = req.body
    let newReview = {}
    let numberOfRatings = 0
    const obj = {
      ClientId,
      TherapistId,
      rating: +rating,
      review
    }
    Review.create(obj)
      .then(data => {
        newReview = data
        return Review.findAll({
          where: {
            TherapistId
          }
        })
      })
      .then(reviews => {
        // console.log(reviews)
        // console.log(reviews.length)
        numberOfRatings = reviews.length
        return Therapist.findByPk(TherapistId)
      })
      .then(therapist => {
        // console.log(therapist.rating)
        // console.log(rating)
        // console.log(numberOfRatings - 1)
        let totalRating = (therapist.rating * (numberOfRatings - 1)) + Number(rating)
        // console.log(totalRating)
        let newRating = totalRating / numberOfRatings
        // console.log(newRating)
        return Therapist.update({
          rating: newRating
        }, {
          where: {
            id: TherapistId
          }
        })
        .then(data => {
          console.log(newReview)
          res.status(201).json(newReview)
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = { ReviewController }