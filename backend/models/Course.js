// models/Course.js
// done with lynn , farah , adam
import mongoose from 'mongoose';

// Topic schema (nested in module)
const topicSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
}, { _id: false });

// Module schema (nested in curriculum)
const moduleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: {
    type: [topicSchema],
    default: [],
  },
}, { _id: false });

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // Changed to String to match mock data format like "20h"
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    curriculum: {
      type: [moduleSchema],
      default: [],
    },
    learningPoints: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Made optional for seed data
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;

