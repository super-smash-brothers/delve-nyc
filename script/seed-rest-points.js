// const {RestaurantPoint, NeighborPoly, neighborPropSchema} = require('../server/db/models/')

// original code below

// const dataSet1 = require('../../../restaurant1.json')
// const dataSet2 = require('../../../restaurant2.json')
// const dataSet3 = require('../../../restaurant3.json')
// const dataSet4 = require('../../../restaurant4.json')
// const dataSet5 = require('../../../restaurant5.json')
// const dataSet6 = require('../../../restaurant6.json')
// const dataSet7 = require('../../../restaurant7.json')
// const dataSet8 = require('../../../restaurant8.json')
// const dataSet9 = require('../../../restaurant9.json')
// const dataSet10 = require('../../../restaurant10.json')
// const dataSet11 = require('../../../restaurant11.json')
// const dataSet12 = require('../../../restaurant12.json')
// const dataSet13 = require('../../../restaurant13.json')
// const dataSet14 = require('../../../restaurant14.json')
// const dataSet15 = require('../../../restaurant15.json')
// const dataSet16 = require('../../../restaurant16.json')
// const dataSet17 = require('../../../restaurant17.json')
// const dataSet18 = require('../../../restaurant18.json')
// const dataSet19 = require('../../../restaurant19.json')
// const dataSet20 = require('../../../restaurant20.json')
// const dataSet21 = require('../../../restaurant21.json')
// const dataSet22 = require('../../../restaurant22.json')
// const dataSet23 = require('../../../restaurant23.json')
// const dataSet24 = require('../../../restaurant24.json')
// const dataSet25 = require('../../../restaurant25.json')
// const dataSet26 = require('../../../restaurant26.json')
// const dataSet27 = require('../../../restaurant27.json')
// const db = mongoose.connect(process.env.MONGODB_SERVER, { useNewUrlParser: true })

// let seedDb = () => {
//   console.log('hello')
//   RestaurantPoint.insertMany(dataSet1, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet2, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet3, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet4, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet5, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet6, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet7, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet8, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet9, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet10, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet11, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet12, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet13, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet14, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet15, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet16, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet17, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet18, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet19, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet20, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet21, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet22, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet23, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet24, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet25, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet26, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   RestaurantPoint.insertMany(dataSet27, (err, ele) => {
//     if (err) console.log(err)
//     console.log(ele)
//   })
//   console.log('finished')
// }
// seedDb()

//Caches aggregateFoodGrade running seed
// let aggregateFoodGrade = async () => {
//   try {
//     const aggregateData = await RestaurantPoint.aggregate([
//       {
//         // '$' denotes an operation for mongoose
//         $group: {
//           // for each group
//           _id: '$nta', // where the id matches the nta
//           total: {
//             $sum: {
//               // sum up for a total
//               $toInt: '$score' // convert string to integer
//             }
//           },
//           count: {$sum: 1}
//         }
//       }
//     ])
//     aggregateData.forEach(async data => {
//       if (data._id !== null) {
//         // make sure there is a specified nta in _id
//         console.log(data)
//         const filter = {'properties.NTACode': data._id}
//         const update = {
//           $set: {'properties.aggregateFoodGrade': data.total / data.count}
//         }

//         const doc = await NeighborPoly.findOneAndUpdate(filter, update, {
//           upser: true
//         }).exec()
//         console.log(doc)
//       }
//     })
//     console.log('completed')
//   } catch (error) {
//     console.error(error)
//   }
// }

// .then(aggregateData => {
//   // aggregateData is an array
//   aggregateData.forEach(data => {
//     if (data._id !== null) {
//       // make sure there is a specified nta in _id
//       console.log(data)
//       NeighborPoly.update(
//         // append data to neighborhood
//         { 'properties.NTACode': data._id }, // specify the documents to update
//         { $set: { 'properties.aggregateFoodGrade': (data.total / data.count) } }, // set specific field of document
//         { upsert: true }, //adds fiel
//         (err) => {
//           // update is not saved without the presence of this callback
//           console.log(err)
//         }
//       )
//     }
//   })
// })

// RestaurantPoint.barChart('$cuisine')
