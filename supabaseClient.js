require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ktwbzdxzcfezullwkdwz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0d2J6ZHh6Y2ZlenVsbHdrZHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MTAwMzEsImV4cCI6MjAzMzE4NjAzMX0.waIRHl4uRgkZKVpcO8rO6gCQ2NQuF4ZaSip6cgmT7v4";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
