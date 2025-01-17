import {Job} from "../models/job.model.js";

//admin will post the job
export const postJob = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            requirements, 
            salary, 
            location, 
            jobType, 
            experiencelevel, 
            position, 
            companyId 
        } = req.body;

        const userId = req.id;

        // Validate required fields
        if (
            !title || 
            !description || 
            !requirements || 
            !salary || 
            !location || 
            !jobType || 
            !experiencelevel || 
            !position || 
            !companyId
        ) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Parse and format the requirements
        const formattedRequirements = requirements.split(" ").map(item => item.trim());

        // Create a new job
        const job = await Job.create({
            title,
            description,
            requirements: formattedRequirements, // Save as an array
            salary: Number(salary), // Convert salary to a number
            location,
            jobType,
            experienceLevel: experiencelevel, // Corrected key to match request body
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the job",
            error: error.message,
            success: false
        });
    }
};


//with this logic students can get all job details
export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
        
    }
    catch(error){
        console.log(error);
    }

}

//student
export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({job,success:true});

    }catch(error){
        console.log(error);
    }

}


// how many jobs are created by particular admin
export const getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}