from moviepy.video.io.VideoFileClip import VideoFileClip


def get_length(file):
    clip = VideoFileClip(file)
    duration_in_sec = clip.duration
    print(int(duration_in_sec))
    return duration_in_sec


